import axios from 'axios';

export function fetchRewardsSuccess(rewards) {
    return {
        type: 'FETCH_REWARDS_SUCCESS',
        payload: rewards
    };
}

export function fetchPunishmentsSuccess(punishments) {
    return {
        type: 'FETCH_PUNISHMENTS_SUCCESS',
        payload: punishments
    };
}

export function fetchRewardsAndPunishments() {
    return (dispatch) => {
        axios.get('/api/rewards')
            .then(response => {
                dispatch(fetchRewardsSuccess(response.data));
            });
        axios.get('/api/punishments')
            .then(response => {
                dispatch(fetchPunishmentsSuccess(response.data));
            });
    };
}
