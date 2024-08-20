const express = require('express');
const userRouter = require('./userRoutes')
const recipeRouter=require('./recipeRoutes')
const ingredientRouter=require('')

const apiRouter = express.Router();

// apiRouter.route('/').get(getEndpoints)
apiRouter.use('/users', userRouter)
apiRouter.use('/recipes', recipeRouter)

module.export= apiRouter