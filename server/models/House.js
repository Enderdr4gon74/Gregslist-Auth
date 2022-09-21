import mongoose from "mongoose"
import { JobSchema } from "./Job.js"
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const HouseSchema = new Schema({
  bedrooms: {type: Number, required: true, min: 1},
  bathrooms: {type: Number, required: true, min: 1},
  levels: {type: Number, required: true, min: 1},
  imgUrl: {type: String, default: "https://3dwarehouse.sketchup.com/warehouse/v1.0/publiccontent/b24c6708-4f94-405e-888b-0ea19b5625d9"},
  year: {type: Number, required: true, min:0, max: new Date().getFullYear()},
  price: {type: Number, required: true, min: 0},
  description: {type: String, default: ''},

  sellerId: {type: ObjectId, required: true, ref: "Account"}
  
}, {timestamps: true, toJSON: {virtuals: true}})

JobSchema.virtual('seller', {
  localField: 'sellerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})