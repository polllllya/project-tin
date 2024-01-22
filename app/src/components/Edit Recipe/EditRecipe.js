// EditRecipe.js
import React, { useState } from "react";
import axios from "axios";
import "./EditRecipe.css";
import { useNavigate, useLocation } from "react-router-dom";

const EditRecipe = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialRecipeData = location.state?.initialRecipeData;

  const [updatedRecipe, setUpdatedRecipe] = useState({
    Name: initialRecipeData.Name || "",
    Info: initialRecipeData.Info || "",
    Ingredients: initialRecipeData.Ingredients || "",
    Directions: initialRecipeData.Directions || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("Name", updatedRecipe.Name);
      formData.append("Info", updatedRecipe.Info);
      formData.append("Ingredients", updatedRecipe.Ingredients);
      formData.append("Directions", updatedRecipe.Directions);
      formData.append("Image", updatedRecipe.Image);

      await axios.put(
        `http://localhost:3001/recipes/${initialRecipeData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Przepis został zaktualizowany!");
      navigate(`/recipe-info/${initialRecipeData.id}`);
    } catch (error) {
      console.error("Błąd aktualizacji przepisu:", error);
      alert("Wystąpił błąd podczas aktualizacji przepisu.");
    }
  };

  return (
    <div>
      {" "}
      <header>
        <div className="logo">KetoRecipes</div>
        <nav className="navigation">
          <ul className="nav-links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="/views/Recipe List/ingex.html">Recipes</a>
            </li>
            <li>
              <a href="/views/User List/index.html">Users</a>
            </li>
            <li>
              <a href="/views/User Info/index.html">My Account</a>
            </li>
          </ul>
        </nav>
        <a className="login" href="#" id="login-link">
          Log In
        </a>
      </header>
      <main>
        <div className="edit-recipe-container">
          <h1>Recipe Editor</h1>
          <div className="form">
            <div className="one-form">
              <p>Name</p>
              <input
                type="text"
                name="Name"
                value={updatedRecipe.Name}
                onChange={handleInputChange}
              />
            </div>
            <div className="one-form ta">
              <p>Description</p>
              <textarea
                name="Description"
                value={updatedRecipe.Description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="one-form ta">
              <p>Ingredients</p>
              <textarea
                name="Ingredients"
                value={updatedRecipe.Ingredients}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="one-form ta">
              <p>Directions</p>
              <textarea
                name="Directions"
                value={updatedRecipe.Directions}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="one-form add-img">
              <p>Image</p>
              <input
                name="Image"
                value={updatedRecipe.Image}
                onChange={handleInputChange}
              ></input>
            </div>
            <button onClick={handleEdit}>Submit</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditRecipe;
