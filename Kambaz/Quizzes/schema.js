import mongoose from "mongoose";

// Sub-schema for questions
const questionSchema = new mongoose.Schema({
  // Mongoose will automatically add a unique _id (of type ObjectId) to each sub-document
  title: { type: String, default: "New Question" },
  questionType: { 
    type: String, 
    enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_THE_BLANK"], // Removed "Essay" to match requirements
    default: "MULTIPLE_CHOICE"
  },
  points: { type: Number, default: 1 },
  questionText: { type: String, default: "" }, // Changed from 'question' to 'questionText' for clarity
  options: [{
    text: String,
    correct: { type: Boolean, default: false }
  }],
  blanks: [{
    text: String,
    caseSensitive: { type: Boolean, default: false }
  }],
  correctAnswers: [String], // for Fill in a Blank
  explanation: String
});

const quizSchema = new mongoose.Schema({
  // Mongoose will automatically add a unique _id (of type ObjectId) for the main document
  title: { type: String, default: "Unnamed Quiz" },
  course: { type: String, ref: "CourseModel" },
  description: String,
  quizType: { 
    type: String, 
    enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
    default: "Graded Quiz"
  },
  points: { type: Number, default: 0 },
  assignmentGroup: { type: String, default: "Quizzes" },
  shuffleAnswers: { type: Boolean, default: true },
  timeLimit: { type: Number, default: 20 },
  multipleAttempts: { type: Boolean, default: false },
  howManyAttempts: { type: Number, default: 1 },
  showCorrectAnswers: { 
    type: String, 
    enum: ["Immediately", "Never", "After Due Date"],
    default: "Immediately"
  },
  accessCode: String,
  oneQuestionAtATime: { type: Boolean, default: true },
  webcamRequired: { type: Boolean, default: false },
  lockQuestionsAfterAnswering: { type: Boolean, default: false },
  dueDate: Date,
  availableDate: Date,
  untilDate: Date,
  published: { type: Boolean, default: false },
  questions: [questionSchema] // <-- Nested questions schema
}, {
  collection: "quizzes"
});

export default quizSchema;