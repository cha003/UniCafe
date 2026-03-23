const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Menu = require('./models/Menu');
const Order = require('./models/Order');
const User = require('./models/User');
const Contact = require('./models/Contact');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_key';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection string will be used in startServer function
// Auth Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, studentId, password } = req.body;

        // Robust Input Validation
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return res.status(400).json({ message: 'Valid name is required' });
        }
        if (!studentId || typeof studentId !== 'string' || studentId.trim().length === 0) {
            return res.status(400).json({ message: 'Valid student ID is required' });
        }
        if (!password || typeof password !== 'string' || password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Check if user already exists
        let user = await User.findOne({ studentId: studentId.trim() });
        if (user) {
            return res.status(400).json({ message: 'User with this Student ID already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            name: name.trim(),
            studentId: studentId.trim(),
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Server Registration Error Details:', {
            message: err.message,
            stack: err.stack,
            name: err.name,
            code: err.code
        });

        // Handle Mongoose uniqueness constraint or other validation errors
        if (err.code === 11000) {
            return res.status(400).json({ message: 'User with this Student ID already exists' });
        }
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation failed',
                errors: Object.values(err.errors).map(e => e.message)
            });
        }

        res.status(500).json({
            message: 'An internal server error occurred during registration',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post('/api/auth/google', async (req, res) => {
    try {
        const { tokenId } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const { email, name, sub } = payload;

        // Find or create user
        let user = await User.findOne({ studentId: email }); // Using email as studentId for Google users
        if (!user) {
            user = new User({
                name,
                studentId: email,
                password: await bcrypt.hash(sub, 10), // Random password for Google users
                role: 'student'
            });
            await user.save();
        }

        // Create JWT
        const token = jwt.sign(
            { id: user._id, role: user.role, name: user.name, studentId: user.studentId },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                studentId: user.studentId,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Google Auth Error:', err);
        res.status(400).json({ message: 'Google authentication failed' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { studentId, password } = req.body;

        // Find user
        const user = await User.findOne({ studentId });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT
        const token = jwt.sign(
            { id: user._id, role: user.role, name: user.name, studentId: user.studentId },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                studentId: user.studentId,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Menu Routes
app.get('/api/menu', async (req, res) => {
    try {
        const menu = await Menu.find({ availability: true });
        res.json(menu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/menu', async (req, res) => {
    try {
        const newMenuItem = new Menu(req.body);
        const savedMenuItem = await newMenuItem.save();
        res.status(201).json(savedMenuItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Order Routes
app.post('/api/orders', async (req, res) => {
    try {
        // Calculate queue position based on pending/preparing orders
        const activeOrders = await Order.countDocuments({
            status: { $in: ['pending', 'preparing'] }
        });

        // Estimate wait time: 5 mins per order + 10 mins base
        const estimatedWaitTime = (activeOrders * 5) + 10;

        const newOrder = new Order({
            ...req.body,
            queuePosition: activeOrders + 1,
            estimatedWaitTime: estimatedWaitTime
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/orders/all', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/orders/:studentId', async (req, res) => {
    try {
        const orders = await Order.find({ studentId: req.params.studentId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Queue Status Route
app.get('/api/queue/status', async (req, res) => {
    try {
        const activeOrders = await Order.countDocuments({
            status: { $in: ['pending', 'preparing'] }
        });

        // Calculate average wait time
        const avgWaitTime = (activeOrders * 5) + 10;

        res.json({
            queueLength: activeOrders,
            estimatedWaitTime: avgWaitTime,
            lastUpdated: new Date()
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin Routes
app.get('/api/admin/stats', async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalRevenue = await Order.aggregate([
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);
        const totalMenuItems = await Menu.countDocuments();

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayOrders = await Order.countDocuments({
            createdAt: { $gte: today }
        });

        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(10);

        // Analytics: Most popular items
        const popularItems = await Order.aggregate([
            { $unwind: '$items' },
            { $group: { _id: '$items.name', count: { $sum: '$items.quantity' }, revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        // Weekly trends (last 7 days)
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weeklyOrders = await Order.aggregate([
            { $match: { createdAt: { $gte: weekAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    count: { $sum: 1 },
                    revenue: { $sum: '$totalAmount' }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Average order value
        const avgOrderValue = totalOrders > 0 ? (totalRevenue[0]?.total || 0) / totalOrders : 0;

        res.json({
            totalOrders,
            totalRevenue: totalRevenue[0]?.total || 0,
            totalMenuItems,
            todayOrders,
            recentOrders,
            analytics: {
                popularItems,
                weeklyTrends: weeklyOrders,
                avgOrderValue: Math.round(avgOrderValue)
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/menu/all', async (req, res) => {
    try {
        const menu = await Menu.find();
        res.json(menu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/menu/:id', async (req, res) => {
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedMenu) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.json(updatedMenu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/menu/:id', async (req, res) => {
    try {
        const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
        if (!deletedMenu) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/orders/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// User Management Routes
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude password from response
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const { name, studentId, password, role } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ studentId });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            studentId,
            password: hashedPassword,
            role: role || 'student'
        });

        const savedUser = await newUser.save();

        // Remove password from response
        const userResponse = savedUser.toObject();
        delete userResponse.password;

        res.status(201).json(userResponse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/users/:id/role', async (req, res) => {
    try {
        const { role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Contact Message Routes
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/contact', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/contact/:id/read', async (req, res) => {
    try {
        const msg = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
        if (!msg) return res.status(404).json({ error: 'Message not found' });
        res.json(msg);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Basic Route
app.get('/', (req, res) => {
    res.send('University Cafeteria API is running');
});

// Start Server and Connect DB
const startServer = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB Connected');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

startServer();
