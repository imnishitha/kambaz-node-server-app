import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    // The _id field should be a String to match your sample document IDs (e.g., "A101")
    _id: { type: String, required: true },
    title: { type: String, required: true },
    course: { type: String, required: true },
    description: String,
    points: Number,
    group: String,
    displayGradeAs: String,
    submissionType: String,
    onlineEntryOptions: [String],
    assignTo: String,
    dueDate: Date,
    availableFrom: Date,
    untilDate: Date,
    available: Boolean,
  },
  { collection: "assignments" }
);

const AssignmentModel = mongoose.model("Assignment", assignmentSchema);

export default AssignmentModel;