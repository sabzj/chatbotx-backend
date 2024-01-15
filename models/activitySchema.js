import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Should add a name"],
  },
  description: {
    type: String,
    required: [true, "Should add proper description"],
  },
  category: {
    type: String,
    required: [true, "Should define category name"],
  },
  volunteersNeeded: Number,
  volunteersAttending: Number,
  date: {
    type: Date,
  },
  location: {
    type: {
      latitude: Number,
      longitude: Number,
    },
    required: [true, "Should assign location variables"],
  },
  images: [
    {
      fileName: String,
    },
  ],
});

const Activity = mongoose.model("Activity", ActivitySchema);
export default Activity;
