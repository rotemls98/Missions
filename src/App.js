import React, {Component} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import MissionListContainer from "./Components/MissionListContainer";
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import refresh from "./Reducers/refreshReducer";
import MissionsInStatuses from "./Components/MissionsInStatuses";


const store = createStore(refresh, undefined, window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     timestamps: [Date.now(), Date.now(), Date.now()]
        // }
        // this.refreshContainers = this.refreshContainers.bind(this);
    }





    render() {
        // const {timestamps} = this.state;
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
