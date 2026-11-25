import { INITIAL_STUDY_MATERIALS } from '../utils/constants.js';

export const studyMaterialService = {
  getPublicMaterials: async (params = {}) => {
    let list = [...INITIAL_STUDY_MATERIALS];

    if (params.resourceType && params.resourceType !== 'All') {
      list = list.filter(m => m.resourceType === params.resourceType);
    }
    if (params.examination && params.examination !== 'All') {
      list = list.filter(m => m.examination === params.examination);
    }
    if (params.subject && params.subject !== 'All') {
      list = list.filter(m => m.subject === params.subject);
    }
    if (params.year && params.year !== 'All') {
      list = list.filter(m => m.year === params.year);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q)
      );
    }
    if (params.limit) {
      list = list.slice(0, parseInt(params.limit, 10));
    }

    return {
      materials: list,
      total: list.length,
      page: 1,
      totalPages: 1
    };
  },

  getMaterialById: async (id) => {
    return INITIAL_STUDY_MATERIALS.find(m => m.id === id || m._id === id) || null;
  },

  getDownloadUrl: (id) => {
    const item = INITIAL_STUDY_MATERIALS.find(m => m.id === id || m._id === id);
    return item?.filePath || '#';
  }
};
