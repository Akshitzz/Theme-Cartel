import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
// shopifyId: {
//     type: String,
//     required: true,
//     unique: true,
//     index: true 
//   },
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

  category: {
    type: String,
    enum: ['Shopify Themes', 'Brand Essentials', 'Other'],
    default: 'Other'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

ProductSchema.virtual('isSale').get(function() {
  return !!(this.compareAtPrice && this.price < this.compareAtPrice);
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;