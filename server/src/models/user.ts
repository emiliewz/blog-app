import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IUser } from '../types';

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'username required'],
    minLength: 3,
    unique: true
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
}, { timestamps: true });

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (_document, returnedObject: Record<string, unknown>) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const User = model<IUser>('User', userSchema);

export default User;