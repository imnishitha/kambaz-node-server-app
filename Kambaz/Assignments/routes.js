import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {

  const findAssignmentsForCourse = async (req, res) => {
    const { cid } = req.params;
    const assignments = await dao.findAssignmentsForCourse(cid);
    res.json(assignments);
  };


  const createAssignment = async (req, res) => {
    const newAssignment = await dao.createAssignment(req.body);
    res.json(newAssignment);
  };


  const findAssignmentById = async (req, res) => {
    const { aid } = req.params;
    const assignment = await dao.findAssignmentById(aid);
    if (!assignment) {
      res.status(404).send("Assignment not found");
      return;
    }
    res.json(assignment);
  };


  const updateAssignment = async (req, res) => {
    const { aid } = req.params;
    const updatedAssignment = await dao.updateAssignment(aid, req.body);
    res.json(updatedAssignment);
  };


  const deleteAssignment = async (req, res) => {
    const { aid } = req.params;
    await dao.deleteAssignment(aid);
    res.sendStatus(204); 
  };


  app.get("/api/courses/:cid/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:cid/assignments", createAssignment);
  app.get("/api/courses/:cid/assignments/:aid", findAssignmentById);
  app.put("/api/courses/:cid/assignments/:aid", updateAssignment);
  app.delete("/api/courses/:cid/assignments/:aid", deleteAssignment);
}