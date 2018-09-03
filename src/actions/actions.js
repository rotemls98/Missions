export const addComponent = (id) => ({
    type: 'ADD_COMPONENT',
    id,
    timestamp: undefined
});

export const refreshComponent = componentRefreshId => ({
    type: 'REFRESH_COMPONENT',
    id: componentRefreshId,
    timestamp: Date.now()
});

export const refreshComponents = (...componentsRefreshId) => ({
    type: 'REFRESH_COMPONENTS',
    ids: componentsRefreshId,
    timestamp: Date.now()
});

export const removeComponent = (id) => ({
    type: 'REMOVE_COMPONENT',
    id
});
