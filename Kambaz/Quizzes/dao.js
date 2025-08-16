import QuizModel from "./model.js";
// Assuming you have a QuestionModel
import QuestionModel from "./model.js";

// --- Quiz DAO ---
export function findQuizzesForCourse(courseId) {
  return QuizModel.find({ course: courseId });
}

export function createQuiz(quiz) {
  // Let MongoDB handle the _id
  return QuizModel.create(quiz);
}

export function deleteQuiz(quizId) {
  return QuizModel.deleteOne({ _id: quizId });
}

export function updateQuiz(quizId, quizUpdates) {
  return QuizModel.findByIdAndUpdate(quizId, quizUpdates, { new: true });
}

export function publishQuiz(quizId, published) {
  return QuizModel.updateOne({ _id: quizId }, { published });
}

// Get quiz questions for taking the quiz (without correct answers for students)
export function findQuizForTaking(quizId) {
  // You need to define how to handle hiding answers in your DAO
  // This is a placeholder for a more complex query
  return QuizModel.findById(quizId);
}

// Get full quiz with answers (for instructors)
export function findQuizWithAnswers(quizId) {
  return QuizModel.findById(quizId);
}

// --- Question DAO ---
// export function findQuestionsForQuiz(quizId) {
//     return QuestionModel.find({ quizId: quizId });
// }
export const findQuestionsForQuiz = async (quizId) => {
    const quiz = await QuizModel.findById(quizId, { 'questions': 1 });
    return quiz ? quiz.questions : [];
};
export const findQuestionById = async (quizId, questionId) => {
    const quiz = await QuizModel.findById(quizId);
    if (!quiz) return null;
    return quiz.questions.id(questionId);
};

// export function createQuestion(question) {
//     return QuestionModel.create(question);
// }
export const createQuestion = async (quizId, question) => {
    const newQuestion = await QuizModel.findByIdAndUpdate(
        quizId,
        {
            $push: { questions: question },
            $inc: { points: question.points }
        },
        { new: true, runValidators: true }
    );
    if (!newQuestion) return null;
    return newQuestion;
};

// export function updateQuestion(questionId, quizId, questionUpdates) {
//     // First verify the question belongs to the specified quiz
//     return QuestionModel.findOneAndUpdate(
//         { 
//             _id: questionId, 
//             quizId: quizId  // Ensure question belongs to this quiz
//         }, 
//         { 
//             ...questionUpdates, 
//             quizId: quizId  // Ensure quizId doesn't get overwritten
//         }, 
//         { new: true }
//     );
// }

export const updateQuestion = async (questionId,quizId, questionUpdates) => {
    const updatedQuiz = await QuizModel.findOneAndUpdate(
        { _id: quizId, "questions._id": questionId },
        {
            $set: { "questions.$": questionUpdates },
            // You may need to handle points updates separately if points change
        },
        { new: true, runValidators: true }
    );
    if (!updatedQuiz) return null;
    return updatedQuiz.questions;
};

// export function deleteQuestion(questionId, quizId) {
//     // Only delete if question belongs to the specified quiz
//     return QuestionModel.findOneAndDelete({
//         _id: questionId,
//         quizId: quizId
//     });
export const deleteQuestion = async (questionId, quizId) => {
    const deletedQuiz = await QuizModel.findByIdAndUpdate(
        quizId,
        { $pull: { questions: { _id: questionId } } },
        { new: true }
    );
    return deletedQuiz;
};
