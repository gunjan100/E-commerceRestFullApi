// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically creates createdAt and updatedAt fields
});

// Middleware to update updatedAt field on document update
categorySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
