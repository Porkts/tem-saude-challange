'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clinics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  clinics.init(
    {
      nome: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      logradouro: DataTypes.STRING,
      numero: DataTypes.STRING,
      bairro: DataTypes.STRING,
      estado: DataTypes.STRING,
      cidade: DataTypes.STRING,
      pais: DataTypes.STRING,
      complemento: DataTypes.TEXT,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'clinics',
    }
  );
  return clinics;
};
