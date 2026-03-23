const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const createIms = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/university-cafeteria');

        let imsUser = await User.findOne({ studentId: 'ims_admin' });
        if (!imsUser) {
            imsUser = new User({
                name: 'Inventory Manager',
                studentId: 'ims_admin',
                role: 'inventory'
            });
        }

        const salt = await bcrypt.genSalt(10);
        imsUser.password = await bcrypt.hash('ims123', salt);

        await imsUser.save();
        console.log('Inventory Manager (ims_admin) created successfully with password "ims123".');

        process.exit(0);
    } catch (err) {
        console.error('Error creating IMS Admin:', err);
        process.exit(1);
    }
};

createIms();
