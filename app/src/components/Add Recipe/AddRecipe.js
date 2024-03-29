import React, { useState } from "react";
import axios from "axios";
import './AddRecipe.css';

const AddRecipe = ({ recipeId, onClose, onEdit }) => {
    const [updatedRecipe, setUpdatedRecipe] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedRecipe((prevRecipe) => ({
            ...prevRecipe,
            [name]: value,
        }));
    };

    const handleEdit = async () => {
        try {
            // Send a request to update the recipe
            await axios.put(
                `http://localhost:3001/add-recipe`,
                updatedRecipe
            );

            // Notify the parent component about the edit
            onEdit();

            // Close the edit form (you can implement this function in the parent component)
            onClose();
        } catch (error) {
            console.error("Error updating recipe:", error);
        }
    };

    return (
        <div className="addRecipe">
            <header>
                <div className="logo">KetoRecipes</div>
                <nav className="navigation">
                    <ul className="nav-links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Recipes</a></li>
                        <li><a href="#">Users</a></li>
                        <li><a href="#">My Account</a></li>
                    </ul>
                </nav>
                <a className="login" href="#" id="login-link">Log In</a>
            </header>
            <main>
                <h1>Add a new Recipe</h1>
                <div className="form">
                    <div className="one-form">
                        <p>Recipe name</p>
                        <input />
                    </div>
                    <div className="one-form ta">
                        <p>Description</p>
                        <textarea></textarea>
                    </div>
                    <div className="one-form ta">
                        <p>Ingredients</p>
                        <textarea></textarea>
                    </div>
                    <div className="one-form ta">
                        <p>Directions</p>
                        <textarea></textarea>
                    </div>
                    <div className="one-form add-img">
                        <p>Image</p>
                        <input type="file" accept="image/png, image/jpeg" />
                    </div>
                    <button>Submit</button>
                </div>
            </main>
        </div>
    );
};

export default AddRecipe;