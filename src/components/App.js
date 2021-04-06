import React, { useState, useEffect } from "react"
import RecipeList from "./RecipeList"
import "../css/app.css"
import { v4 as uuidv4 } from "uuid"
import RecipeEdit from "./RecipeEdit"

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = "cookingWithDab.recipes"

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  )

  console.log(selectedRecipe)

  useEffect(() => {
    const recipeJson = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJson != null) setRecipes(JSON.parse(recipeJson))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeEditDelete,
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeEditDelete() {
    console.log("Remove")
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "Name",
      cookTime: "1:00",
      servings: 1,
      instructions: "Instrc.",
      ingredients: [
        {
          id: uuidv4(),
          name: "Name",
          amount: "1 Tbs",
        },
      ],
    }
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id) {
    setRecipes(recipes.filter((recipe) => recipe.id !== id))
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    cookTime: "1:45",
    servings: 3,
    instructions:
      "1. Put salt on chicken \n2. Put chicken in oven \n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "3 Tbs",
      },
    ],
  },
  {
    id: 2,
    name: "Plain Pork",
    cookTime: "0:45",
    servings: 5,
    instructions: "1. Put paprika on pork \n2. Put pork in oven \n3. Eat pork",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "1 Pounds",
      },
      {
        id: 2,
        name: "Paprika",
        amount: "1.5 Tbs",
      },
    ],
  },
]

export default App
