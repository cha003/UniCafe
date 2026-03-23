const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    itemName: String,
    category: {
        type: String,
        enum: ['Food', 'Beverage', 'Snack', 'Other']
    },
    currentStock: Number,
    minStockThreshold: Number,
    unit: String, // e.g., 'kg', 'units', 'liters'
    demandForecast: {
        peakHours: [String],
        examWeekAdjustment: {
            type: Number, // Percentage increase
            default: 1.5
        }
    },
    lastRestocked: Date
});

module.exports = mongoose.model('Inventory', InventorySchema);
