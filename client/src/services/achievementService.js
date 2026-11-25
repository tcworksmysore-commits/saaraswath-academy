import { INITIAL_ACHIEVERS } from '../utils/constants.js';

export const achievementService = {
  getAllAchievements: async () => {
    return INITIAL_ACHIEVERS;
  }
};
