import { v4 as uuidv4 } from "uuid";
import Database from "../Database/index.js"; // Adjust the path as needed

let enrollments = Database.enrollments;

export const findEnrollmentsForUser = (userId) => {
  return enrollments.filter((e) => e.user === userId);
};

export const findEnrollment = (userId, courseId) => {
  return enrollments.find((e) => e.user === userId && e.course === courseId);
};

export const enrollUserInCourse = (userId, courseId) => {
  const newEnrollment = {
    _id: uuidv4(),
    user: userId,
    course: courseId,
  };
  enrollments.push(newEnrollment);
  return newEnrollment;
};

export const unenrollUser = (userId, courseId) => {
  const enrollmentIndex = enrollments.findIndex(
    (e) => e.user === userId && e.course === courseId
  );
  if (enrollmentIndex !== -1) {
    enrollments.splice(enrollmentIndex, 1);
  }
};