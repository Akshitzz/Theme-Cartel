import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  company: { type: String, trim: true },
  address1: { type: String, required: true, trim: true },
  address2: { type: String, trim: true },
  city: { type: String, required: true, trim: true },
  province: { type: String, trim: true }, // State/Province
  country: { type: String, required: true, trim: true },
  zip: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  isDefault: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
  shopifyCustomerId: {
    type: String,
    unique: true,
    sparse: true, 
    index: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },

  password: {
    type: String,
    required: function() {
      // Password is required only if they aren't logging in via an OAuth provider like Google/Shopify
      return !this.shopifyCustomerId; 
    },
    minlength: 8,
    select: false
  },
  phone: {
    type: String,
    trim: true
  },
  addresses: [addressSchema],
  
  acceptsMarketing: {
    type: Boolean,
    default: false
  },

  // Role-based access control (Admin vs regular customer)
  role: {
    type: String,
    enum: ['customer', 'admin', 'editor'],
    default: 'customer'
  },
  
  // Security & Account Recovery
  isActive: {
    type: Boolean,
    default: true
  },
  passwordResetToken: { type: String, index: true },
  passwordResetExpires: Date

}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Pre-save hook to ensure only one default address exists
userSchema.pre('save', async function() {
  if (this.isModified('addresses')) {
    const defaultAddresses = this.addresses.filter(addr => addr.isDefault);
    if (defaultAddresses.length > 1) {
      // If multiple are marked default, keep only the last one as default
      this.addresses.forEach(addr => addr.isDefault = false);
      this.addresses[this.addresses.length - 1].isDefault = true;
    } else if (defaultAddresses.length === 0 && this.addresses.length > 0) {
      // If none are default but addresses exist, make the first one default
      this.addresses[0].isDefault = true;
    }
  }
});


userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  return userObject;
};

const User = mongoose.model('User', userSchema);

export default User;