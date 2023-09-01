import mongoose from 'mongoose';

import { Schema } from 'mongoose';

const PlacesSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'user' },
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: String,
    checkout: String,
    maxGuests: Number,
    price: Number
});

const PlacesModel = mongoose.model('Place', PlacesSchema);

export default PlacesModel;

