import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    borrowerName: {
      type: String,
      required: true,
      trim: true,
    },

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    borrowDate: {
      type: Date,
      default: Date.now,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    returnedDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["Borrowed", "Returned"],
      default: "Borrowed",
    },

    lateFee: {
      type: Number,
      default: 0,
    },

    lateFeePerDay: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

const Borrow = mongoose.model("Borrow", borrowSchema);

export default Borrow;