'use strict';
module.exports = (sequelize, DataTypes) => {
  const Health = sequelize.define('Health', {
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "利用者は必須です。"
        }
      }
    },
    begin: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: "日時は必須です。"
        }
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "体重は必須です。"
        }
      }
    },
    state: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: "状態は必須です。"
        }
      }
    },
    temp: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "体温は必須です。"
        }
      }
    }
  }, {});
  Health.associate = function(models) {
    Health.belongsTo(models.User);
  };
  return Health;
};