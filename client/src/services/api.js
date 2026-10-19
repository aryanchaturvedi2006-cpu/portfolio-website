/**
 * Centralized API endpoints configuration.
 * Supports local development (Vite proxy) and deployed production backends (VITE_API_URL).
 */

const rawApiUrl = import.meta.env.VITE_API_URL || '';
export const API_BASE_URL = typeof rawApiUrl === 'string' ? rawApiUrl.trim().replace(/\/+$/, '') : '';

export const API_ENDPOINTS = {
  resumePdf: `${API_BASE_URL}/api/resume/pdf`,
  resumeDocx: `${API_BASE_URL}/api/resume/docx`,
  contact: `${API_BASE_URL}/api/contact`,
  health: `${API_BASE_URL}/api/health`
};

export default API_ENDPOINTS;
