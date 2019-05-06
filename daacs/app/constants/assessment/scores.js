export const SCORE_LOW = { value: 'LOW', label: 'Low', description: 'Low Score' };
export const SCORE_MEDIUM = { value: 'MEDIUM', label: 'Medium', description: 'Medium Score' };
export const SCORE_HIGH = { value: 'HIGH', label: 'High', description: 'High Score' };
export const DEFAULT_SCORE_MAP = {
    [SCORE_LOW.value]: '[,)',
    [SCORE_MEDIUM.value]: '[,)',
    [SCORE_HIGH.value]: '[,]'
};

export default [
    SCORE_LOW,
    SCORE_MEDIUM,
    SCORE_HIGH
];
