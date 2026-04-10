import mongoose from "mongoose";
// Sub-schema for items purchased
// We store the name, price, and image AT THE TIME OF PURCHASE.
// If the product price changes later, this historical record remains accurate.
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  image: { type: String }
});

// Sub-schema for the shipping address used for this specific order
const orderAddressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  city: { type: String, required: true },
  province: { type: String },
  country: { type: String, required: true },
  zip: { type: String, required: true },
  phone: { type: String }
});

const orderSchema = new mongoose.Schema({
  // Useful if syncing with Shopify
  shopifyOrderId: {
    type: String,
    unique: true,
    sparse: true,
    index: true
  },
  // Reference to the user who placed the order (can be null for guest checkouts)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false 
  },
  guestEmail: {
    type: String,
    lowercase: true,
    trim: true
  },
  
  orderItems: [orderItemSchema],
  shippingAddress: { type: orderAddressSchema, required: false },
  billingAddress: orderAddressSchema,

  // Payment Tracking
  paymentMethod: {
    type: String,
    required: true,
    default: 'Stripe' // or PayPal, Shopify Payments, etc.
  },
  paymentResult: {
    id: { type: String }, // Transaction ID from payment gateway
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String }
  },
  
  // Price Breakdown
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },

  // Order Lifecycle Status
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'],
    default: 'Pending'
  },

  // Payment Status
  isPaid: {
    type: Boolean,
    default: false
  },
  paidAt: {
    type: Date
  },

  // Fulfillment Status
  isDelivered: {
    type: Boolean,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  trackingNumber: {
    type: String,
    trim: true
  }

}, {
  timestamps: true 
});

// Pre-save hook to ensure guest email exists if no user ID is provided
orderSchema.pre('save', function(next) {
  if (!this.user && !this.guestEmail) {
    return next(new Error('Order must have either a user reference or a guest email.'));
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;