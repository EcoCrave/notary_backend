import mongoose from "mongoose";

const clientDetailSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    address: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      zipCode: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
    },
    chosenServices: [
      {
        type: String,
        required: true,
        enum: ["Service1", "Service2", "Service3"], // Add actual service options here
      },
    ],
    adviserEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    idType: {
      type: String,
      required: true,
      enum: ["Passport", "DriverLicense", "NationalID", "Other"],
    },
    idNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    uploadedFile: {
      type: String, // Assuming the file is stored as a URL path or filename
      required: true,
    },
    uploadedSignature: {
      type: String, // Assuming the signature is stored as a URL path or filename
    },
    videoConferenceDateTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);
export const Client = mongoose.model("Client", clientDetailSchema);
