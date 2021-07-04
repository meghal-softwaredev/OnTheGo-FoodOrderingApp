const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo:{
      type:String,
      required: true
    },
    location:{
        type:String,
        required: true
    },
    rating:{
        type:String,
        required: true
    },
    eta: {
        type:Number,
        required:true
    },
    tags:{
        type:[String],
        required:true
    }
  }
);
restaurantSchema.index( { name: "text", location: "text" } );
const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
