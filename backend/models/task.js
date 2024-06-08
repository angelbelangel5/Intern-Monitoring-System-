const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    intern: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    tasks: [
        {
            description: { type: String, required: true },
            status: { type: String, enum: ['pending', 'confirmed'], default: 'pending' },
            comment: { type: String },
        }
    ],
});

module.exports = mongoose.model('Task', taskSchema);
