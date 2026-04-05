import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
shopifyId: {
    type: String,
    required: true,
    unique: true,
    index: true 
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  // The URL 
  handle: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },
  
  compareAtPrice: {
    type: Number,
    min: 0,
    default: null
  },

  priceVaries: {
    type: Boolean,
    default: false
  },
  featuredImage: {
    type: String,
    trim: true
  },
 
  url: {
    type: String,
    trim: true
  },

  category: {
    type: String,
    enum: ['Shopify Themes', 'Brand Essentials', 'Other'],
    default: 'Other'
  },
  
  isSale: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true

});

ProductSchema.pre('save', function(next) {
  if (this.compareAtPrice && this.price < this.compareAtPrice) {
    this.isSale = true;
  } else {
    this.isSale = false;
  }
  next();
});

const Product = mongoose.model('Product', ProductSchema);