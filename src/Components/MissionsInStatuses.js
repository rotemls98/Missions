import React, {Component, Fragment} from 'react';
import MissionListContainer from "./MissionListContainer";
import {connect} from 'react-redux';
import uuidv4 from 'uuid';
import {refreshComponent} from "../actions/actions";
import {addMission} from "../Manager/MissionManager";
import AddMissionDialog from "./AddMissionDialog";
import DialogForm from "../common/Dialog/DialogForm";

class MissionsInStatuses extends Component {
    constructor(props) {
        super(props);

        this.refreshIds = {
            waiting: uuidv4(),
            working: uuidv4(),
            done: uuidv4(),
        };

        this.state = {
            open: false
        };

        this.handleAddMission = this.handleAddMission.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleAddMission(title, description) {
        const mission = {title, description};
        addMission(mission).then(() =>
            this.props.refreshComponent(this.refreshIds.waiting));
        this.handleClose();
    }

    handleMissionClick() {

    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    render() {
        const {refreshIds} = this;
        return (
            <Fragment>
                <button data-test-id="add-button" onClick={this.handleOpen}>Add Mission</button>
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
                    onSubmit={this.handleAddMission}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    refreshComponent: (refreshId) => dispatch(refreshComponent(refreshId))
});

export default connect(null, mapDispatchToProps)(MissionsInStatuses);
