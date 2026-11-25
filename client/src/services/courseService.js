import { INITIAL_COURSES } from '../utils/constants.js';

export const courseService = {
  getAllCourses: async () => {
    return INITIAL_COURSES;
  },

  getCourseById: async (id) => {
    return INITIAL_COURSES.find(c => c.id === id) || null;
  }
};
