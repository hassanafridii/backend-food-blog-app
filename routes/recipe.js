const express = require('express');

const router = express.Router();
const {getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload} = require('../controller/recipe.js');
const verifyToken = require('../middleware/auth.js');


router.get('/', getRecipes); // get all Recipe
router.get('/:id', getRecipe)   // get Recipe by id
router.post('/' , upload.single('file'), verifyToken , addRecipe)  // add Recipe
router.put('/:id', upload.single('file'), editRecipe) // update Recipe
router.delete('/:id', deleteRecipe) // delete Recipe 

  
  module.exports = router;