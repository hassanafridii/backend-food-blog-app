const Recipes=require('../models/recipe')
const multer  = require('multer')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename= Date.now() + '-' + file.fieldname
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

const getRecipes = async(req,res)=>{
  const recipes = await Recipes.find()
   return res.json(recipes)
}

const getRecipe =async (req,res)=>{
  const recipe = await Recipes.findById(req.params.id)
  return res.json(recipe)
}

const addRecipe = async(req,res)=>{
  console.log(req.user);
  
  const {title,ingredients,instructions,time}=req.body

    if(!title || !instructions || !ingredients ){
    res.json({message: 'required fields cant be empty'})
}
   const newRecipe=await Recipes.create({
        title,
        ingredients,
        instructions,
        time ,
        coverImage:req.file.filename,
        createdBy:req.user.id
    })
   return res.json(newRecipe)
}
const editRecipe = async(req,res)=>{
     const {title,ingredients,instructions,time}=req.body
     
     let recipe= await Recipes.findById(req.params.id)
     try {
         if(recipe){
               let coverImage = req.file?.filename ? req.file?.filename : recipe.coverImage

       await Recipes.findByIdAndUpdate(req.params.id,{...req.body,coverImage},{new:true})
       res.json({title,ingredients,instructions,time})
     }
     } catch (error) {
      return res.status(404).json({message:"error"})
     }
  
}

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    await Recipes.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}




module.exports={
    getRecipes,
    getRecipe,
    addRecipe,
    editRecipe,
    deleteRecipe,
    upload
}