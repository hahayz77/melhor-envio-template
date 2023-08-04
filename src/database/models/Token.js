import { Schema, model, models } from 'mongoose';

const TokenSchema = new Schema({
    access_token: {
        type: String,
        required: true,
        unique: true
    },
    refresh_token: {
        type: String,
        required: true,
        unique: true
    },
    expires_in: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // Add timestamps option here
});

const Token = models?.Token || model('Token', TokenSchema);

export default Token;
