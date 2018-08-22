const refresh = (state = [], action) => {
    switch (action.type) {
        case 'ADD_COMPONENT':
            return [
                ...state,
                {
                    id: action.id,
                    timestamp: action.timestamp
                }
            ];
        case 'REFRESH_COMPONENT':
            return state.map(item =>
                (item.id === action.id)
                    ? {...item, timestamp: action.timestamp}
                    : item
            );
        case 'REFRESH_COMPONENTS':
            return state.map(item => {
                const itemToRefresh = action.ids.find(id => item.id === id);
                if (itemToRefresh) {
                    return {...item, timestamp: action.timestamp}
                }
                return item;
            })
        case 'REMOVE_COMPONENT':
            return state.filter(item => item.id !== action.id);
        default :
            return state;
    }
}

export default refresh
