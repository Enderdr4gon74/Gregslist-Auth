import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const JobSchema = new Schema({
  company: {type: String, required: true},
  jobTitle: {type: String, required: true},
  hours: {type: Number, required: true, maxlength: 168},
  rate: {type: Number, required: true, min: 7.25},
  description: {type: String, default: ''},

  sellerId: {type: ObjectId, required: true, ref: "Account"}
}, {timestamps: true, toJSON: {virtuals: true}})

JobSchema.virtual('seller', {
  localField: "sellerId",
  foreignField: "_id",
  justOne: true, 
  ref: 'Account'
})