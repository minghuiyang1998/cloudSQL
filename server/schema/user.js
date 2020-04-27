/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uuid: {
      type: "LINESTRING",
      allowNull: false
    },
    username: {
      type: "LINESTRING",
      allowNull: false
    },
    password: {
      type: "LINESTRING",
      allowNull: false
    },
    passhash: {
      type: "LINESTRING",
      allowNull: false
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    modifiedDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'user'
  });
};
