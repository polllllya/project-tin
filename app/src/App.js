import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserInfo from "./components/UserInfo";
import RegisterForm from "./components/RegisterForm";
import RecipeList from "./components/RecipeList";
import RecipeInfo from "./components/Recipe Info/RecipeInfo";
import LoginForm from "./components/LoginForm";
import EditUser from "./components/EditUser";
import EditRecipe from "./components/Edit Recipe/EditRecipe";
import AddUser from "./components/AddUser";
import AddRecipe from "./components/AddRecipe";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/users" element={UserList} />
          <Route path="/users/:userId" element={UserInfo} />
          <Route path="/register" element={RegisterForm} />
          <Route path="/recipes" element={RecipeList} />
          <Route path="/recipes/:recipeId" element={<RecipeInfo />} />
          <Route path="/login" element={LoginForm} />
          <Route path="/edit-user/:userId" element={EditUser} />
          <Route path="/edit-recipe/:recipeId" element={<EditRecipe />} />
          <Route path="/add-user" element={AddUser} />
          <Route path="/add-recipe" element={AddRecipe} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
