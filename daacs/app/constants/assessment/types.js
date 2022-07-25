import {SCORING_AVERAGE, SCORING_MANUAL, SCORING_LIGHTSIDE, SCORING_BERT, SCORING_SUM} from 'daacs/constants/assessment/scoring-types';
export const TYPE_MULTIPLE_CHOICE = {value: 'MULTIPLE_CHOICE', label: 'Multiple Choice', scoringTypes: [SCORING_AVERAGE, SCORING_SUM]};
export const TYPE_CAT = {value: 'CAT', label: 'CAT', scoringTypes: [SCORING_AVERAGE]};
export const TYPE_LIKERT = {value: 'LIKERT', label: 'Likert Scale', scoringTypes: [SCORING_AVERAGE, SCORING_SUM]};
export const TYPE_WRITING_PROMPT = {value: 'WRITING_PROMPT', label: 'Writing Prompt', scoringTypes: [SCORING_MANUAL, SCORING_LIGHTSIDE, SCORING_BERT]};

export default [
    TYPE_MULTIPLE_CHOICE,
    TYPE_CAT,
    TYPE_LIKERT,
    TYPE_WRITING_PROMPT
];
