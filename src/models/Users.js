import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String,  },
  email: { type: String,  },
  password: { type: String, },
  plan: { type: String, default: "Basic" },
  imageGenerator:{type:Number ,default:0},
  videoGenerator:{type:Number,default:0},
  audioGenerator:{type:Number , default:0},
  codeGenerator:{type:Number , default:0}
}, { timestamps: true }); // <-- this enables createdAt & updatedAt


export default mongoose.models.User || mongoose.model('User', UserSchema);
