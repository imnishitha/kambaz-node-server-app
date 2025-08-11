import { v4 as uuidv4 } from "uuid";
import Database from "../Database/index.js"; // Adjust the path as needed

let enrollments = Database.enrollments;

export const findEnrollmentsForUser = (userId) => {
  return enrollments.filter((e) => e.user === userId);
};

export const findEnrollment = (userId, courseId) => {
  return enrollments.find((e) => e.user === userId && e.course === courseId);
};

// export const enrollUserInCourse = (userId, courseId) => {
//   const newEnrollment = {
//     _id: uuidv4(),
//     user: userId,
//     course: courseId,
//   };
//   enrollments.push(newEnrollment);
//   return newEnrollment;
// };

export const unenrollUser = (userId, courseId) => {
  const enrollmentIndex = enrollments.findIndex(
    (e) => e.user === userId && e.course === courseId
  );
  if (enrollmentIndex !== -1) {
    enrollments.splice(enrollmentIndex, 1);
  }
};

import model from "./model.js";
export async function findCoursesForUser(userId) {
 const enrollments = await model.find({ user: userId }).populate("course");
 return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
 const enrollments = await model.find({ course: courseId }).populate("user");
 return enrollments.map((enrollment) => enrollment.user);
}
export async function enrollUserInCourse(user, course) {
 return await model.create({ user, course, _id: `${user}-${course}` });
}
export function unenrollUserFromCourse(user, course) {
 return model.deleteOne({ user, course });
}

 
