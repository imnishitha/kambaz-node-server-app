import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {

  const findEnrollmentsForUser = (req, res) => {
    const { uid } = req.params;
    const userEnrollments = dao.findEnrollmentsForUser(uid);
    res.json(userEnrollments);
  };


  const enrollUserInCourse = (req, res) => {
    const { uid, cid } = req.params;
    const existingEnrollment = dao.findEnrollment(uid, cid);
    if (existingEnrollment) {
      res.status(409).send("User is already enrolled in this course");
      return;
    }
    const newEnrollment = dao.enrollUserInCourse(uid, cid);
    res.status(201).json(newEnrollment);
  };


  const unenrollUser = (req, res) => {
    const { uid, cid } = req.params;
    dao.unenrollUser(uid, cid);
    res.sendStatus(204);
  };

  app.get("/api/users/:uid/enrollments", findEnrollmentsForUser);
  app.post("/api/users/:uid/enrollments/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/enrollments/:cid", unenrollUser);
}