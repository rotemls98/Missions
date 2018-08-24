import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MissionList from "./MissionList";
import {fetchMissions, moveMissionUp, updateMissionStatus} from "../Manager/MissionManager";
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
    constructor(props) {
        super(props);

        this.state = {
            missions: []
        };

        this.getMissions = this.getMissions.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }


    componentDidMount() {
        this.getMissions();
    }

    getMissions() {
        fetchMissions(this.props.statusId).then(missions => this.setState({missions}));
    }

    handleDrop(missionId, missionStatusId, sourceMissionRefreshId) {
        const {statusId, refreshId} = this.props;
        if (missionStatusId !== statusId) {
            updateMissionStatus(missionId, statusId).then(() =>
                this.props.refreshComponents(sourceMissionRefreshId, refreshId));
        }
    }

    handleArrowClick(id) {
        moveMissionUp(id).then(this.getMissions);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.timestamp !== this.props.timestamp) {
            this.getMissions();
        }
    }




    render() {
        return (
            <MissionList
                refreshId={this.props.refreshId}
                missions={this.state.missions}
                statusName={this.props.statusName}
                onDrop={this.handleDrop}
                onArrowClick={(id) => this.handleArrowClick(id)}
            />
        )
    };
}


MissionListContainer.propTypes = propTypes;





export default withRefreshChild(MissionListContainer);

