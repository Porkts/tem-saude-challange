var express = require('express');
var router = express.Router();
const { clinics } = require('../models');

/**
 * POST returns all clinics
 */
router.get('/', async function (req, res, next) {
  const { city } = req.query
  var clinicas = []

  if (city) {
    clinicas = await clinics.findAll({
      where: {
        cidade: city
      }
    })
  } else {
    clinicas = await clinics.findAll({});
  }
  res.json(clinicas);
});

/**
 * POST create a new clinic
 */
router.post('/', async function (req, res, next) {
  const { nome, cnpj, logradouro, numero, bairro, estado, cidade, pais, complemento, latitude, longitude } = req.body;

  if (!nome || !cnpj || !logradouro || !latitude || !longitude) {
    return res.status(400).json({
      message: 'Preencha todos os campos obrigatórios.',
    });
  }

  const newClinic = await clinics.create(req.body);
  res.json(newClinic);
});

module.exports = router;
