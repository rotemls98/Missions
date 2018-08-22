import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MissionList from "./MissionList";
import {getMissions, updateMissionStatus} from "../Manager/MissionManager";
import withRefreshChild from "./withRefreshChild";

const propTypes = {
    statusId: PropTypes.number.isRequired,
    statusName: PropTypes.string.isRequired,

    // from refresh HOC and Redux
    refreshId: PropTypes.string,
    timestamp: PropTypes.number,
    refreshComponents : PropTypes.func
};


class MissionListContainer extends Component {
    state = {
        missions: []
    };


    componentDidMount() {
        getMissions(this.props.statusId).then(missions => this.setState({missions}));
    }

    handleDrop(missionId, missionStatusId, sourceMissionRefreshId) {
        const {statusId, refreshId} = this.props;
        if (missionStatusId !== statusId) {
            updateMissionStatus(missionId, statusId).then(() =>
                this.props.refreshComponents(sourceMissionRefreshId, refreshId));
        }
    }


    componentDidUpdate(prevProps) {
        if (prevProps.timestamp !== this.props.timestamp) {
            getMissions(this.props.statusId).then(missions => this.setState({missions}));
        }
    }


    render() {
        return (
            <MissionList
                refreshId={this.props.refreshId}
                missions={this.state.missions}
                statusName={this.props.statusName}
                onDrop={(missionId, currentStatusId, refreshId) => this.handleDrop(missionId, currentStatusId, refreshId)}
            />
        )
    };
}


MissionListContainer.propTypes = propTypes;





export default withRefreshChild(MissionListContainer);

