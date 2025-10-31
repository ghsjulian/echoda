const mongoose = require("mongoose");

const flyerSchema = new mongoose.Schema(
    {
        flyer: {
            type: Object,
            required: true,
        },
        title: {
            type: Object,
            required: true,
        },
        downloads : {
          type : Array ,
          default: []
        },
    },
    {
        timestamps: true
    }
);

const Flyer = mongoose.model("Flyer", flyerSchema);
module.exports = Flyer;
