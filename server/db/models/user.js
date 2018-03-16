const Sequelize = require('sequelize')
const db = require('../db')


const User = db.define('user', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    gallery: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    facebookId: {
        type: Sequelize.STRING,
        allowNull: false,
    }

})


module.exports = User
