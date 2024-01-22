import React, { useState } from "react";
import axios from "axios";
import "./EditRecipe.css"; // Import your CSS file

const EditRecipe = ({ recipeId, onClose, onEdit }) => {
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
        `http://localhost:3001/recipes/${recipeId}`,
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
    <div className="edit-recipe-container">
      <h1>Recipe Editor</h1>
      <div className="form">
        {/* Add form fields for editing recipe details */}
        <div className="one-form">
          <p>Recipe name</p>
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
        {/* ... Repeat for other fields ... */}
        <div className="one-form add-img">
          <p>Image Link</p>
          <input
            type="text"
            name="Image_Link"
            value={updatedRecipe.Image_Link}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleEdit}>Submit</button>
      </div>
    </div>
  );
};

export default EditRecipe;
