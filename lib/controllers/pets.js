const { Router } = require('express');
const Pet = require('../models/Pet');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const pet = await Pet.getById(req.params.id);
      res.json(pet);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const pets = await Pet.getAll();
      res.json(pets);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const pet = await Pet.insert(req.body);
      res.json(pet);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const pet = await Pet.updateById(req.params.id, req.body);
      res.json(pet);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const pet = await Pet.deleteById(req.params.id);
      res.json(pet);
    } catch (e) {
      next(e);
    }
  });
