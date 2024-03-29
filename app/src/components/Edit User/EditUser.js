import React, { useState } from "react";
import axios from "axios";
import './EditRecipe.css';

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
                `http://localhost:3001//edit-user/`, //ToDo
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
        <div className="editUser">
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
                <h1>Edit User</h1>
                <div className="form">
                    <div className="one-form">
                        <p>First Name</p>
                        <input value="Palina" />
                    </div>
                    <div className="one-form">
                        <p>Last Name</p>
                        <input value="Brahina" />
                    </div>
                    <div className="one-form">
                        <p>Email</p>
                        <input value="palina.b@gmail.com" />
                    </div>
                    <div className="one-form">
                        <p>Password</p>
                        <input value="12345678" />
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

export default EditUser;
