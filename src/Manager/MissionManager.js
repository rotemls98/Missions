
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

export const editMission = (id, mission) => {
    return fetch(`${BASE_URL}/edit/${id}`, {
        method : 'PUT',
        headers: {
            'content-type' : 'Application/json'
        },
        body: JSON.stringify(mission)
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

export const getMission = (id) => {
    return fetch(`${BASE_URL}/${id}`).then(res => res.json());
};