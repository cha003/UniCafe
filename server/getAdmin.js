const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const findAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const adminUsers = await User.find({ role: 'admin' });
        console.log('Admin users:', adminUsers);

        if (adminUsers.length === 0) {
            console.log("No admin users found.");
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

findAdmin();
