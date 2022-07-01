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
  });
