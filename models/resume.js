const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    education: {
      type: Array,
      default: []
    },
    experience: {
      type: Array,
      default: []
    },
    skills: {
      type: Array,
      default: []
    },
    projects: {
      type: Array,
      default: []
    },
    aiGeneratedContent: {
      type: Object,
      default: {}
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
