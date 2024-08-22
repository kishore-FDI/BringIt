import mongoose, { Schema, Document } from "mongoose";

const imageSchema = new mongoose.Schema({
    name: { type: String, required: false },
    imgURL: { type: String, required: false } // Optional description for each image
});

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: false },
    price: { type: Number, required: true },
    imgs: [imageSchema] ,// Define the array of objects for image URLs
    category:{type:mongoose.Types.ObjectId,ref:'Category'},
    prodProps:{type:Object},
    
},{
    timestamps:true,
});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
