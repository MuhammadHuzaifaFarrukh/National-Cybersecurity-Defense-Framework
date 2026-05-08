const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const PermissionSchema = new Schema(
  {
    permission_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

PermissionSchema.index({ createdAt: -1 });

module.exports = model("Permission", PermissionSchema);
