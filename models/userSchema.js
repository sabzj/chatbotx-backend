import mongoose from "mongoose";

// schema: name, description, category, age, date, location and image.
const skillEnum = [
  "Community Clean-Up",
  "Educational Tutoring",
  "Elderly Assistance",
  "Animal Welfare",
  "Food Distribution",
  "Event Volunteering",
  "Gardening",
];
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: [true, "This email is already in use"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  age: { type: Number },
  location: { type: String },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  skills: {
    type: [
      {
        type: String,
        enum: skillEnum,
      },
    ],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
