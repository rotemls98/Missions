import React, {Component} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import refresh, * as fromRefresh  from "./Reducers/refreshReducer";
import MissionsInStatuses from "./Components/MissionsInStatuses";
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
    refresh,
    form : formReducer,
});

export const getRefresh = (state, refreshId) =>
    fromRefresh.getRefresh(state.refresh, refreshId);

const store = createStore(rootReducer, undefined, window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__());


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <MissionsInStatuses/>
                </div>
            </Provider>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);
