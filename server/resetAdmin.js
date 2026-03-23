const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const resetAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        let adminUser = await User.findOne({ studentId: 'admin' });
        if (!adminUser) {
            adminUser = new User({
                name: 'Admin',
                studentId: 'admin',
                role: 'admin'
            });
        }

        const salt = await bcrypt.genSalt(10);
        adminUser.password = await bcrypt.hash('admin123', salt);

        await adminUser.save();
        console.log('Admin password reset successfully to "admin123" for studentId "admin".');

        // Also ensure an admin01 exists with admin123
        let admin01 = await User.findOne({ studentId: 'admin01' });
        if (admin01) {
            admin01.password = await bcrypt.hash('admin123', salt);
            await admin01.save();
            console.log('Admin password reset successfully to "admin123" for studentId "admin01".');
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

resetAdmin();
