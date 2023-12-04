const router = require('express').Router()
const Accounts = require('./accounts-model.js')
const md = require('./accounts-middleware'); 

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Accounts.getAll();
    res.json(data)
  } catch(err){
    next(err)
  }
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Accounts.getById(req.params.id)
    res.json(data)
  } catch(err){
    next(err)
  }
})

router.post('/', md.checkAccountPayload, md.checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
 
  try {
    const data = await Accounts.create({
      name: req.body.name.trim(),
      budget: req.body.budget
    });
    console.log(data);
    res.status(201).json(data);
  } catch(err){
    next(err)
  }
})

router.put('/:id',
   md.checkAccountId,
   md.checkAccountPayload,
   async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Accounts.updateById(req.params.id, req.body)
    res.json(data)
  } catch(err){
    next(err)
  }
});

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Accounts.deleteById(req.params.id)
    res.json(data)
  } catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
