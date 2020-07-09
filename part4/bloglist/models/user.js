const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog"
  }]
});

userSchema
  .set("toJSON", {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.password;
    }
  });

userSchema.plugin(validator);
module.exports = mongoose.model("User", userSchema);
