const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        fullName: { type: String, default: '' },
        phone: { type: String, default: '' },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        isVip: { type: Boolean, default: false },
        favorites: { type: Array },
        history: { type: Array },
        confirm: { type: Boolean, default: false },
        img: { type: String, default: '' },
        slug: { type: String, slug: 'username', unique: true },
    },
    { timestamps: true }
);
mongoose.plugin(slug);

module.exports = mongoose.model('User', UserSchema);
