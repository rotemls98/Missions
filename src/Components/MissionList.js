import React from 'react';
import PropTypes from 'prop-types';
import Mission from "./Mission";
import './MissionList.css';
import {DropTarget} from "react-dnd/lib/index";
import {Types} from "../DragTypes";
// import {CircularProgress} from "@material-ui/core";

const missionTarget = {
    drop(targetProps, monitor) {
        const { id, statusId, refreshId} = monitor.getItem();
        targetProps.onDrop(id, statusId, refreshId);
    }
};

const propTypes = {
    missions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string
    })),
    statusName : PropTypes.string.isRequired,
    onArrowClick : PropTypes.func.isRequired,
    onMissionClick: PropTypes.func.isRequired,
};

const MissionList = (props) => {
    const { connectDropTarget } = props;
    return connectDropTarget(
        <div className='mission-list'>
            <div className='mission-list-title'>{props.statusName}</div>
            {props.missions.map((mission, index) =>
                <Mission
                    key={mission.id}
                    showArrow={Boolean(index)}
                    onArrowClick={props.onArrowClick}
                    onMissionClick={props.onMissionClick}
                    {...mission}
                />
            )}
            {/*<CircularProgress color='primary'/>*/}
        </div>
    );
};

MissionList.propTypes = propTypes;

const collect = (connect) => ({
    connectDropTarget: connect.dropTarget()
});

export default DropTarget(Types.mission, missionTarget, collect)(MissionList);