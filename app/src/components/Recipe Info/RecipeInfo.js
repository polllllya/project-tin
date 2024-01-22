import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecipeInfo.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const RecipeInfo = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({}); // State przechowujący daneprzepisu
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Pobiera informacje o konkretnym przepisie przy użyciu nowej ścieżki
    axios
      .get(`http://192.168.0.31:3001/recipes/${recipeId}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
      });

    axios
      .get(`http://192.168.0.31:3001/recipes/${recipeId}/reviews`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [recipeId]);

  return (
    <div>
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
        <div className="img-container">
          <img className="main-img" src={recipe.Image_Link} />
          <button className="img-button">Like it ♥️</button>
        </div>

        <div className="recipe-intro__content">
          <h1>{recipe.Name}</h1>
          <div className="recipe-intro__description">
            <p>{recipe.Info}</p>
          </div>
        </div>

        <div className="row">
          <div className="column l">
            <h2>Ingredients</h2>
            <p className="description">{recipe.Ingredients}</p>
          </div>
          <div className="column r">
            <h2>Directions</h2>
            <p className="description">{recipe.Description}</p>
          </div>
        </div>

        <div className="edit-delete-buttons ed-recipe">
          <div className="last-m">
            <h3>Do You want to make changes to this recipe?</h3>
          </div>
          <Link
            to={{
              pathname: `/edit-recipe/${recipeId}`,
              state: { initialRecipeData: recipe },
            }}
            className="ed-button e"
          >
            Edit
          </Link>
          <button className="ed-button d">Delete</button>
        </div>

        <section className="reviews">
          <h2>Write a Review</h2>
          <div className="write-review">
            <div className="sub-column">
              <textarea placeholder="Wrire a Review"></textarea>
            </div>

            <div className="sub-column">
              <button className="submit-button">Submit</button>
            </div>
          </div>
          <h2>Reviews</h2>
          {reviews.map((review) => (
            <div className="review-row">
              <div className="info-img col left">
                <img src={review.User.Image_Link} alt="" />
                <div className="review">
                  <p className="name">{review.User.Name}</p>
                  <p className="time">{review.Date}</p>
                  <p>{review.Comment}</p>
                </div>
              </div>

              <div className="edit-delete-buttons col right">
                <div>
                  <button className="ed-button-col e">Edit</button>
                </div>
                <div>
                  <button className="ed-button-col d">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default RecipeInfo;
