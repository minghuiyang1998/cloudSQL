import { DataTypes } from 'sequelize'

export const user = (sequelize) => {
    return sequelize.define('user', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nickname: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: true
      },
      creationTime: {
        type: DataTypes.DATE,
        allowNull: true
      },
      updateTime: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      tableName: 'user'
    });
};