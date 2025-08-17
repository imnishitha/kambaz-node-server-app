import QuizModel from "./model.js";
import QuestionModel from "./model.js";

export function findQuizzesForCourse(courseId) {
  return QuizModel.find({ course: courseId });
}

export function createQuiz(quiz) {
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


export function findQuizForTaking(quizId) {
  return QuizModel.findById(quizId);
}


export function findQuizWithAnswers(quizId) {
  return QuizModel.findById(quizId);
}

export const findQuestionsForQuiz = async (quizId) => {
    const quiz = await QuizModel.findById(quizId, { 'questions': 1 });
    return quiz ? quiz.questions : [];
};
export const findQuestionById = async (quizId, questionId) => {
    const quiz = await QuizModel.findById(quizId);
    if (!quiz) return null;
    return quiz.questions.id(questionId);
};

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



export const updateQuestion = async (questionId, quizId,questionUpdates) => {
    const quiz = await QuizModel.findById(quizId);
    const originalQuestion = quiz.questions.id(questionId);
    const oldPoints = originalQuestion.points;
    const newPoints = questionUpdates.points;
    const pointsDifference = newPoints - oldPoints;
    const updatedQuiz = await QuizModel.findOneAndUpdate(
        { _id: quizId, "questions._id": questionId },
        {
            $set: { "questions.$": questionUpdates }, 
            $inc: { points: pointsDifference }      
        },
        { new: true, runValidators: true }
    );
    if (!updatedQuiz) return null;
    return updatedQuiz.questions;
};


export const deleteQuestion = async (questionId,quizId) => {
    const quiz = await QuizModel.findById(quizId);
    const questionToDelete = quiz.questions.id(questionId);
    const updatedQuiz = await QuizModel.findByIdAndUpdate(
        quizId,
        {
            $pull: { questions: { _id: questionId } }, 
            $inc: { points: -questionToDelete.points } 
        },
        { new: true }
    );
    return updatedQuiz;
};