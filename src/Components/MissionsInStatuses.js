import React, {Component, Fragment} from 'react';
import MissionListContainer from "./MissionListContainer";
import {connect} from 'react-redux';
import uuidv4 from 'uuid';
import {refreshComponents, refreshComponent} from "../actions/actions";
import {addMission} from "../Manager/MissionManager";
import AddMissionDialog from "./AddMissionDialog";



class MissionsInStatuses extends Component {

    constructor(props) {
        super(props);

        this.refreshIds = {
            waiting: uuidv4(),
            working: uuidv4(),
            done: uuidv4(),
        };

        this.state = {
            open : false
        };

        this.handleAddMission = this.handleAddMission.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    // suppose to be in RefreshChildHOC
    handleDropRefresh(sourceRefreshId, targetRefreshId) {
        this.props.dispatch(refreshComponents(sourceRefreshId, targetRefreshId));
    }

    handleAddMission() {
        const title = "barbie";
        const description = "loves to play";

        const mission = { title, description};
        addMission(mission).then(() =>
            this.props.dispatch(refreshComponent(this.refreshIds.waiting)));
        // this.setState({open : true});
    }

    handleClose() {
        this.setState({open : false});
    }

    render() {
        const {refreshIds} = this;
        return (
            <Fragment>
                <button onClick={this.handleAddMission}>Add Mission</button>
                <MissionListContainer
                    refreshId={refreshIds.done}
                    statusId={3}
                    statusName='done'
                />
                <MissionListContainer
                    refreshId={refreshIds.working}
                    statusId={2}
                    statusName='working'
                />
                <MissionListContainer
                    refreshId={refreshIds.waiting}
                    statusId={1}
                    statusName='waiting'/>
                <AddMissionDialog
                    open={this.state.open}
                    onClose={this.handleClose}
                />
            </Fragment>
        );
    }
}


export default connect()(MissionsInStatuses);
