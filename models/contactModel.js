const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    phone: {
      type: String,
      required: [true, "Please add the contact phone"],
    },
    email: {
      type: String,
      required: [true, "Please add the email"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', contactSchema);
