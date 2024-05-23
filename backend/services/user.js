const User = require("../models/user.js");

async function getUsers(){
    const user = await User.find({})
    return user;
}

module.exports = {getUsers}
