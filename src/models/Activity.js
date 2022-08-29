const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
    Difficulty:{
        type: DataTypes.INTEGER,
    },
    Duration:{
        type: DataTypes.STRING,
    },
    Season:{
        type: DataTypes.STRING,
    }
  }, { timestamps: false });
};