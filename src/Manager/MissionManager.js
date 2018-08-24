
const BASE_URL = 'api/mission';
function delay(t, v) {
    return new Promise(function(resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}

export const fetchMissions = (filterId) =>  {
    return fetch(`${BASE_URL}?filterId=${filterId}`).then(res => res.json());
};

export const updateMissionStatus = (id, statusId) => {
    return fetch(`${BASE_URL}/${id}/?statusId=${statusId}`, {
        method : 'PUT'
    });
};

export const addMission = (mission) => {
    return fetch(`${BASE_URL}`, {
        method : 'POST',
        headers: {
            'content-type' : 'Application/json'
        },
        body: JSON.stringify(mission)
    });
};

export const moveMissionUp = (id) => {
    return fetch(`${BASE_URL}/upward/${id}`, {
        method : 'PUT'
    });
};