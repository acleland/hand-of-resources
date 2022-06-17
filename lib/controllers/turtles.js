const { Router } = require('express');
const NinjaTurtle = require('../models/NinjaTurtle');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const turtles = await NinjaTurtle.getAll();
    res.json(turtles);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const turtle = await NinjaTurtle.insert(req.body);
    res.json(turtle);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
