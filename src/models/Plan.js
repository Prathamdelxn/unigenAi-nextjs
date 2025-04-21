import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: {type: String,required: true},
  monthlyPrice: {type: Number, required: true},
  yearlyPrice: {type: Number,required: true},
  description: { type: String,default: ''},
  features: {type: [String],default: []},
  icon: {type: String,default: '⭐'},
  color: { type: String,default: 'bg-blue-500' },
  active: {type: Boolean,default: true},
  
}, {
  timestamps: true
});

export default mongoose.models.Plan || mongoose.model('Plan', planSchema);
