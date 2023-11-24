import { Schema, model } from 'mongoose';
import { IBlog } from '../types';

const blogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    require: true
  },
  url: String,
  likes: Number,
  comments: [
    {
      type: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

blogSchema.set('toJSON', {
  transform: (_document, returnedObject: Record<string, unknown>) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Blog = model<IBlog>('Blog', blogSchema);

export default Blog;