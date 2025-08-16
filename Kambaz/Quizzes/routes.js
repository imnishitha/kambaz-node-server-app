import * as dao from "./dao.js";

export default function QuizRoutes(app) {

  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    const quizzes = await dao.findQuizzesForCourse(cid);
    res.json(quizzes);
  });

  app.get("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const currentUser = req.session["currentUser"];
    
    try {
      let quiz;
      if (currentUser && currentUser.role === "STUDENT") {
        quiz = await dao.findQuizForTaking(qid);
      } else {
        quiz = await dao.findQuizWithAnswers(qid);
      }
      
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    const quiz = {
      ...req.body,
      course: cid,
    };
    
    try {
      const newQuiz = await dao.createQuiz(quiz);
      res.status(201).json(newQuiz);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const quizUpdates = req.body;
    try {
      const updatedQuiz = await dao.updateQuiz(qid, quizUpdates);
      if (!updatedQuiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.json(updatedQuiz);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/quizzes/:qid", async (req, res) => {

    const { qid } = req.params;
    
    try {
      const status = await dao.deleteQuiz(qid);
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/quizzes/:qid/publish", async (req, res) => {
  
    const { qid } = req.params;
    const { published } = req.body;
    
    try {
      const updatedQuiz = await dao.publishQuiz(qid, published);
      res.json(updatedQuiz);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });




  app.get("/api/quizzes/:qid/questions", async (req, res) => {
    const { qid } = req.params;
    const questions = await dao.findQuestionsForQuiz(qid);
    res.json(questions);
  });
  
 
app.post("/api/quizzes/:qid/questions", async (req, res) => {
  const { qid } = req.params;
    const newQuestionData = req.body;

    try {
      const createdQuestion = await dao.createQuestion(qid, newQuestionData);
      const lastcreatedQuestion = createdQuestion.questions[createdQuestion.questions.length - 1]; 
      if (createdQuestion) {
        res.status(201).json(lastcreatedQuestion);
      } else {
        res.status(404).json({ message: "Quiz not found, unable to create question." });
      }
    } catch (error) {
      console.error("Error creating new question:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  });


app.put("/api/quizzes/:qid/questions/:questionId", async (req, res) => {
  const { qid, questionId } = req.params;
  const questionUpdates = req.body;
  const updatedQuestion = await dao.updateQuestion(questionId, qid, questionUpdates);
  res.json(updatedQuestion);
});


app.delete("/api/quizzes/:qid/questions/:questionId", async (req, res) => {
  const { qid, questionId } = req.params;
  await dao.deleteQuestion(questionId, qid); 
  res.sendStatus(204);
});



}