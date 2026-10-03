// src/lib/constants.js
const RESUME_FILE = 'sagar_cv_sde';
const RESUME_VERSION = 2;

export function getResumeUrl() {
  return `/${RESUME_FILE}_v${RESUME_VERSION}.pdf`;
}
