const initialState = {
    rewards: [],
    punishments: []
};

function rewardsReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_REWARDS_SUCCESS':
            return {
                ...state,
                rewards: action.payload
            };
        case 'FETCH_PUNISHMENTS_SUCCESS':
            return {
                ...state,
                punishments: action.payload
            };
        default:
            return state;
    }
}

export default rewardsReducer;
