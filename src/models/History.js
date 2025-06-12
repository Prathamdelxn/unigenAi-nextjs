import mongoose from 'mongoose';


const HistorySchema= new mongoose.Schema({
    userId:{type:String},
    toolType:{type:String},
    time:{type:String,},
    day:{type:String},
    details:{type:String,},

});

export default mongoose.models.History || mongoose.model('History', HistorySchema);