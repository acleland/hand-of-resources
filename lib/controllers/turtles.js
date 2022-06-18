const { Router } = require('express');
const NinjaTurtle = require('../models/NinjaTurtle');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const turtle = await NinjaTurtle.getById(req.params.id);
      res.json(turtle);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const turtle = await NinjaTurtle.updateById(req.params.id, req.body);
      res.json(turtle);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const turtles = await NinjaTurtle.getAll();
      res.json(turtles);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const turtle = await NinjaTurtle.insert(req.body);
      res.json(turtle);
    } catch (e) {
      next(e);
    }
  });
