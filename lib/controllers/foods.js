const { Router } = require('express');
const Food = require('../models/Food');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const food = await Food.getById(req.params.id);
      res.json(food);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const foods = await Food.getAll();
      res.json(foods);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const food = await Food.insert(req.body);
      res.json(food);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const food = await Food.updateById(req.params.id, req.body);
      res.json(food);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const food = await Food.deleteById(req.params.id);
      res.json(food);
    } catch (e) {
      next(e);
    }
  });
