export const TRANSITION_INFINITY = 'INF';
export const TRANSITION_NEG_INFINITY = '-INF';
export const CAT_TRANSITION_EASY = {
    label: 'Easy',
    groupDifficulty: 'EASY',
    transitionDifficulties: ['EASY', 'MEDIUM'],
    transitionMap: {
        EASY: `(${TRANSITION_NEG_INFINITY},]`,
        MEDIUM: `[,${TRANSITION_INFINITY})`
    }
};

export const CAT_TRANSITION_MEDIUM = {
    label: 'Medium',
    groupDifficulty: 'MEDIUM',
    transitionDifficulties: ['EASY', 'MEDIUM', 'HARD'],
    transitionMap: {
        EASY: `(${TRANSITION_NEG_INFINITY},]`,
        MEDIUM: `[,)`,
        HARD: `[,${TRANSITION_INFINITY})`
    }
};

export const CAT_TRANSITION_HARD = {
    label: 'Hard',
    groupDifficulty: 'HARD',
    transitionDifficulties: ['MEDIUM', 'HARD'],
    transitionMap: {
        MEDIUM: `(${TRANSITION_NEG_INFINITY},]`,
        HARD: `[,${TRANSITION_INFINITY})`
    }
};

export default [CAT_TRANSITION_EASY, CAT_TRANSITION_MEDIUM, CAT_TRANSITION_HARD];
