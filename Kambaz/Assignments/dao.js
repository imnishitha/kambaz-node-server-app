import { v4 as uuidv4 } from 'uuid'; 
import Database from "../Database/index.js";



export const findAssignmentsForCourse = (courseId) => {
    const { assignments } = Database;
    return assignments.filter((assignment) => assignment.course === courseId);
};


export const createAssignment = (assignment) => {
    const newAssignment = { ...assignment, _id: uuidv4() };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
};


export const findAssignmentById = (assignmentId) => {
    const { assignments } = Database;
    return assignments.find((assignment) => assignment._id === assignmentId);
};

export const updateAssignment = (assignmentId, assignmentUpdates) => {
    const { assignments } = Database;
    const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
};

export const deleteAssignment = (assignmentId) => {
    const { assignments } = Database;
    Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
    return; 
};

  