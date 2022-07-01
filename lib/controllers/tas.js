const { Router } = require('express');
const TA = require('../models/TA');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const ta = await TA.getById(req.params.id);
      res.json(ta);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const tas = await TA.getAll();
      res.json(tas);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const ta = await TA.insert(req.body);
      res.json(ta);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const ta = await TA.updateById(req.params.id, req.body);
      res.json(ta);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const ta = await TA.deleteById(req.params.id);
      res.json(ta);
    } catch (e) {
      next(e);
    }
  });
