const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const RoleSchema = new Schema(
  {
    role_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    permission_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  {
    timestamps: true,
  }
);

RoleSchema.index({ permission_ids: 1 });

module.exports = model("Role", RoleSchema);
