import mongoose from "mongoose";

import { Schema } from 'mongoose';

const BookingsSchema = new Schema({
    place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Place' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    price: Number
});

const BookingsModel = mongoose.model('Booking', BookingsSchema);
export default BookingsModel