const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
  {
    aboutPage: {
      type: Object,
      default: {},
    },
    teamMembers: {
      type: Array,
      default: [],
    },
    hero : {
        type : Object, default : {}
    }
  },
  {
    timestamps: true,
  }
);

// ✅ Allow only one document
siteSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model("Site", siteSchema);
