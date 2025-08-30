import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  contentImage: { type: String }, // image path
  excerpt: { type: String },
  author: { type: String },
  tags: [String],
  category: { type: String },
  coverImage: { type: String }, // image path
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
