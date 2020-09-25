const bcrypt = require('bcrypt')
const User = require('../models/user')

const newUser = {
    username: "root",
    name: "Superhessu",
    password: "elsecreto"
}

const getAllUsers = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    newUser,
    getAllUsers
}