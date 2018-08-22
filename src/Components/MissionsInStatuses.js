import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import MissionListContainer from "./MissionListContainer";
import {connect} from 'react-redux';
import uuidv4 from 'uuid';
import {refreshComponents, refreshComponent} from "../actions/actions";
import {addMission} from "../Manager/MissionManager";


const propTypes = {};

class MissionsInStatuses extends Component {

    constructor(props) {
        super(props);

        this.refreshIds = {
            waiting: uuidv4(),
            working: uuidv4(),
            done: uuidv4(),
        }

        this.handleAddMission = this.handleAddMission.bind(this);
    }

    // suppose to be in RefreshChildHOC



    handleDropRefresh(sourceRefreshId, targetRefreshId) {
        this.props.dispatch(refreshComponents(sourceRefreshId, targetRefreshId));
    }

    handleAddMission() {
        const title = "אין אש בלי עשן";
        const description = "no fire without smoke";
        const mission = { title, description};
        addMission(mission).then(() =>
            this.props.dispatch(refreshComponent(this.refreshIds.waiting)));
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
            </Fragment>
        );
    }
}

MissionsInStatuses.propTypes = propTypes;

export default connect()(MissionsInStatuses);
