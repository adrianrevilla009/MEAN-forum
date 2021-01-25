const mongoose  = require('mongoose');
const User = require('./user');

const UserDetailsSchema = mongoose.Schema({
    country: { type: String },
    city: { type: String },
    adress: { type: String },
    telephone: { type: String},
    image: { type: String},
    short_description: { type: String },
    about: { type: String},
    check_newsletter:  { type: Boolean, default: false },
    check_posts:  { type: Boolean, default: false  },
    check_offers:  { type: Boolean, default: false  },
    last_conexion: { type: Date },
    register_date: { type: Date },
});

const User_details = module.exports = mongoose.model('user_details', UserDetailsSchema);

module.exports.updateUserDetailsById = async function(details_id, details, callback) {
    await User_details.findByIdAndUpdate(details_id, details, callback);
}

module.exports.getUserDetailsById = async function(details_id, callback) {
    await User_details.findById(details_id, callback);
}

module.exports.addUserDetails = async function(user_details, callback) {
    await user_details.save(callback);
}