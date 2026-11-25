import { INITIAL_FACULTY } from '../utils/constants.js';

export const facultyService = {
  getAllFaculty: async () => {
    return INITIAL_FACULTY;
  },

  getFacultyById: async (id) => {
    return INITIAL_FACULTY.find(f => f.id === id) || null;
  }
};
