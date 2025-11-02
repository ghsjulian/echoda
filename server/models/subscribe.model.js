const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema(
    {
        subscriber: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const Subscriber = mongoose.model("Subscriber", subscribeSchema);
module.exports = Subscriber;
