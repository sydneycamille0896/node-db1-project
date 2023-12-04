const db = require('../../data/db-config.js');
const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const error = { status: 400 };
  const {name, budget} = req.body;
  console.log(name, budget);

  if(name === undefined || budget === undefined){
    error.message = 'name and budget are required';
  } else if (typeof name !== 'string'){
    error.message = 'name of account must be string'
  } else if( name.trim().length < 3 || name.trim().length > 100){
    error.message = 'name of account must be between 3 and 100'
  } else if(typeof budget !== 'number' || isNaN(budget)){
    error.message = 'budget pf account must be a number'
  } else if (budget < 0 || budget > 1000000){
    error.message = 'budget of account is too large or too small'
  }

  if(error.message){
    next(error)
  } else {
    next()
  }

}
exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
//   const { name } = req.body;
//   console.log("Request Body:", req.body);
// console.log("Name:", name);
//   const searchName = await db('accounts')
//     .where('name',name);
//   if(searchName.length > 0){
//     next({status: 400, message: `that name is taken`})
//   } else {
//     next();
//   }
try {
  const existing = await db('accounts')
    .where('name',req.body.name.trim())
    .first()
    if(existing){
      next({status: 400, message: `that name is taken`})
    } else {
      next()
    }
} catch (error){
  next(error)
}
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Accounts.getById(req.params.id);
  if(!account){
    next({status: 404, message: `account not found`})
  } else {
    req.account = account;
    next();
  }
} catch (error){
  next(error)
}
}
