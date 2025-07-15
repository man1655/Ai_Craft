// Server port
 export const BASE_URL = 4000;

// API paths with dynamic segments as template literals
 export const API_PATH = {
  // Session Routes
  SESSIONS: {
    CREATE: '/api/sessions/create',
    GET_ALL: '/api/sessions/my-sessions',
    GET_BY_ID: (id) => `/api/sessions/${id}`,
    DELETE: (id) => `/api/sessions/deletesession/${id}`,
    
  },

  // Question Routes
  QUESTIONS: {
    ADD: '/api/questions/add',
    TOGGLE_PIN: (id) => `/api/questions/${id}/pin`,
    UPDATE_NOTE: (id) => `/api/questions/${id}/note`,
  },

  // AI Routes
  AI: {
    GENERATE_QUESTIONS: '/api/ai/generate-interview-questions',
    GENERATE_EXPLANATION: '/api/ai/generate-explanation',
  },
};


