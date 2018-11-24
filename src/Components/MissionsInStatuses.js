import React, {Component, Fragment} from 'react';
import MissionListContainer from "./MissionListContainer";
import {connect} from 'react-redux';
import uuidv4 from 'uuid';
import {refreshComponent} from "../actions/actions";
import {addMission, editMission} from "../Manager/MissionManager";
import AddMissionDialog from "./AddMissionDialog";
import EditMissionDialogContainer from "./EditMissionDialogContainer";

class MissionsInStatuses extends Component {
    constructor(props) {
        super(props);

        this.refreshIds = {
            waiting: uuidv4(),
            working: uuidv4(),
            done: uuidv4(),
        };

        this.state = {
            addDialogOpen: false,
            editMissionId: null,
            editMissionRefreshId: null,
        };

        this.handleAddMission = this.handleAddMission.bind(this);
        this.handleAddMissionOpen = this.handleAddMissionOpen.bind(this);
        this.handleAddMissionClose = this.handleAddMissionClose.bind(this);
        this.handleEditMissionOpen = this.handleEditMissionOpen.bind(this);
        this.handleEditMissionClose = this.handleEditMissionClose.bind(this);
        this.handleEditMission = this.handleEditMission.bind(this);
    }

    handleAddMission(mission) {
        addMission(mission).then(() =>
            this.props.refreshComponent(this.refreshIds.waiting));
        this.handleAddMissionClose();
    }

    handleEditMission(mission) {
        const {editMissionRefreshId, editMissionId} = this.state;
        editMission(editMissionId, {
                title: mission.title,
                description: mission.description
            }
        ).then(
            () => this.props.refreshComponent(editMissionRefreshId)
        );
        this.handleEditMissionClose();
    }

    handleAddMissionOpen() {
        this.setState({addDialogOpen: true});
    }

    handleAddMissionClose() {
        this.setState({addDialogOpen: false});
    }

    handleEditMissionOpen(mission, refreshId) {
        this.setState({
            editMissionId: mission.id,
            editMissionRefreshId: refreshId
        });
    }

    handleEditMissionClose() {
        this.setState({editMissionId: null, editMissionRefreshId: null});
    }


    render() {
        const {refreshIds} = this;
        return (
            <Fragment>
                <button data-test-id="add-button" onClick={this.handleAddMissionOpen}>Add Mission</button>
                <MissionListContainer
                    onMissionClick={this.handleEditMissionOpen}
                    refreshId={refreshIds.done}
                    statusId={3}
                    statusName='done'
                />
                <MissionListContainer
                    onMissionClick={this.handleEditMissionOpen}

                    refreshId={refreshIds.working}
                    statusId={2}
                    statusName='working'
                />
                <MissionListContainer
                    onMissionClick={this.handleEditMissionOpen}
                    refreshId={refreshIds.waiting}
                    statusId={1}
                    statusName='waiting'/>
                <AddMissionDialog
                    open={this.state.addDialogOpen}
                    onSubmit={this.handleAddMission}
                    onClose={this.handleAddMissionClose}
                />
                <EditMissionDialogContainer
                    id={this.state.editMissionId}
                    open={Boolean(this.state.editMissionId)}
                    onClose={this.handleEditMissionClose}
                    onSubmit={this.handleEditMission}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    refreshComponent: (refreshId) => dispatch(refreshComponent(refreshId))
});

export default connect(null, mapDispatchToProps)(MissionsInStatuses);
