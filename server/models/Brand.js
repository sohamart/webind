const mongoose = require('mongoose');

const ProductSubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['LIVE', 'BETA', 'IN_DEV', 'PLANNED'], default: 'LIVE' },
    link: { type: String, default: '' },
  },
  { _id: true }
);

const ServiceSubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
  },
  { _id: true }
);

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    tagline: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      default: 'Technology',
    },
    tags: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: ['ACTIVE', 'COMING_SOON', 'ARCHIVED'],
      default: 'ACTIVE',
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    shortDescription: {
      type: String,
      default: '',
    },
    fullDescription: {
      type: String,
      default: '',
    },
    brandStory: {
      type: String,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
    lightLogo: {
      type: String,
      default: '',
    },
    darkLogo: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    heroMedia: {
      type: String,
      default: '',
    },
    gallery: [{ type: String }],
    websiteUrl: {
      type: String,
      default: '',
    },
    socialUrls: {
      twitter: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      discord: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    launchDate: {
      type: String,
      default: '',
    },
    products: [ProductSubSchema],
    services: [ServiceSubSchema],
    accentColor: {
      type: String,
      default: '#ffffff',
    },
    seoTitle: {
      type: String,
      default: '',
    },
    seoDescription: {
      type: String,
      default: '',
    },
    ogImage: {
      type: String,
      default: '',
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

BrandSchema.index({ name: 'text', tagline: 'text', shortDescription: 'text', category: 'text' });

module.exports = mongoose.model('Brand', BrandSchema);
