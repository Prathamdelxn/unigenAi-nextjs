import mongoose from 'mongoose';


const AdminSchema= new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    role:{type:String,default:"Admin"},
    status:{type:String,default:"Active"}
});

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);