import AssignmentModel from "./model.js";

export const findAssignmentsForCourse = async (courseId) => {
  return AssignmentModel.find({ course: courseId });
};

export const createAssignment = async (assignment) => {
  const newAssignment = await AssignmentModel.create(assignment);
  return newAssignment;
};

export const findAssignmentById = async (assignmentId) => {
  return AssignmentModel.findOne({ _id: assignmentId });
};

export const updateAssignment = async (assignmentId, assignmentUpdates) => {
  const updatedAssignment = await AssignmentModel.findByIdAndUpdate(
    assignmentId,
    { $set: assignmentUpdates },
    { new: true } // Returns the updated document
  );
  return updatedAssignment;
};

export const deleteAssignment = async (assignmentId) => {
  await AssignmentModel.findByIdAndDelete(assignmentId);
  return; 
};

  