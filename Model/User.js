const { Schema, model } = require("mongoose");

let UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobnumber: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("user", UserSchema);
