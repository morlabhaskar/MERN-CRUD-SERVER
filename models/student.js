import mongoose from "mongoose";
const Schema = mongoose.Schema;
let StudentSchema = new Schema({
    name:{
        type:String
    },
    rollno:{
        type:String
    },
    college:{
        type: String
    },
    branch:{
        type:String 
    }
});
export default mongoose.model('student',StudentSchema);