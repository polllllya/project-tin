const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Konfiguracja bazy danych
const sequelize = new Sequelize("recipes", "root", "In7kog4ni27to1*", {
  host: "localhost",
  dialect: "mysql",
});

// Definicja modeli - tabele "Recipe", "Favorite_Recipe", "Review", "Type", "User"
const Recipe = sequelize.define(
  "Recipe",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Image_Link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Info: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Type_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    User_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Recipe",
    timestamps: false, // Wyłączenie automatycznego dodawania kolumn createdAt i updatedAt
  }
);

const Favorite_Recipe = sequelize.define(
  "Favorite_Recipe",
  {
    User_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Recipe_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Favorite_Recipe",
    primaryKey: true,
  }
);

const Review = sequelize.define(
  "Review",
  {
    Recipe_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Recipe", // Make sure the model name is correct
        key: "Id",
      },
    },
    User_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "User", // Make sure the model name is correct
        key: "Id",
      },
    },
    Comment: {
      type: DataTypes.STRING(1000), // Adjust the length if necessary
      allowNull: false,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Review",
    timestamps: false, // If you don't want timestamps
  }
);

const Type = sequelize.define(
  "Type",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Type",
  }
);

const User = sequelize.define(
  "User",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Image_Link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "User",
  }
);

// Relacje między tabelami
Recipe.belongsTo(User, { foreignKey: "User_Id" });
Favorite_Recipe.belongsTo(User, { foreignKey: "User_Id" });
Favorite_Recipe.belongsTo(Recipe, { foreignKey: "Recipe_Id" });
Review.belongsTo(User, { foreignKey: "User_Id" });
Review.belongsTo(Recipe, { foreignKey: "Recipe_Id" });
Recipe.belongsTo(Type, { foreignKey: "Type_Id" });

// Test połączenia z bazą danych
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Test pobierania danych
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.findByPk(recipeId);

    if (!recipe) {
      // Jeżeli przepis o danym ID nie został znaleziony, zwracamy błąd 404
      res.status(404).json({ error: "Recipe not found" });
      return;
    }

    res.json(recipe);
  } catch (error) {
    console.error(`Error fetching recipe with ID ${recipeId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/recipes/:id/reviews", async (req, res) => {
  const recipeId = req.params.id;

  try {
    // Pobranie recenzji dla danego przepisu na podstawie recipeId
    const reviews = await Review.findAll({
      where: { Recipe_Id: recipeId },
      include: [
        // Dodanie informacji o użytkowniku, który napisał recenzję
        { model: User, attributes: ["Id", "Name", "Image_Link"] },
      ],
    });

    res.json(reviews);
  } catch (error) {
    console.error(
      `Error fetching reviews for recipe with ID ${recipeId}:`,
      error
    );
    res.status(500).send("Internal Server Error");
  }
});

// Update a recipe
app.put("/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;
  const updatedRecipeData = req.body; // Assuming you send updated data in the request body

  try {
    const recipe = await Recipe.findByPk(recipeId);

    if (!recipe) {
      res.status(404).json({ error: "Recipe not found" });
      return;
    }

    // Update the recipe with new data
    await recipe.update(updatedRecipeData);

    res.json({ message: "Recipe updated successfully" });
  } catch (error) {
    console.error(`Error updating recipe with ID ${recipeId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete a recipe
app.delete("/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.findByPk(recipeId);

    if (!recipe) {
      res.status(404).json({ error: "Recipe not found" });
      return;
    }

    // Delete the recipe
    await recipe.destroy();

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error(`Error deleting recipe with ID ${recipeId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// Uruchomienie serwera na porcie 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
