const registerUser = require('./register-user')
const retrieveUser = require('./retrieve-user')
const modifyUser = require('./modify-user')
const unregisterUser = require('./unregister-user')
const authenticateUser = require('./authenticate-user')
const searchVehicles = require('./search-vehicles')
const addCreditCardToUser = require('./add-credit-card-to-user')

module.exports = {
    registerUser,
    retrieveUser,
    modifyUser,
    unregisterUser,
    authenticateUser,
    searchVehicles,
    addCreditCardToUser
}