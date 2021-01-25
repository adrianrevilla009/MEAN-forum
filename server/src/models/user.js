const mongoose  = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String , required: true},
    username: { type: String , required: true},
    password: { type: String , required: true},
    details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_details'
    }
});

const User = module.exports = mongoose.model('user', UserSchema);

module.exports.getUserById = async function(id, callback) {
    await User.findById(id, callback)
}
module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username}
    User.findOne(query, callback)
}

module.exports.updateUserById = function(id, user, callback) {
    User.findByIdAndUpdate(id, user, callback);
}
// Encapsulate hash methods in user and not in routes
module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};
module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}