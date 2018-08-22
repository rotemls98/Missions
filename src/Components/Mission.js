import React from 'react';
import PropTypes from 'prop-types';
import './Mission.css';
import {DragSource} from 'react-dnd';
import {Types} from "../DragTypes";
import withRefreshId from "./withRefreshId";

const missionSource = {
    beginDrag(props) {
        return {
            id: props.id,
            statusId : props.statusId,
            refreshId : props.refreshId
        };
    }
}

const propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    statusId: PropTypes.oneOf([1, 2, 3]).isRequired,

    // from refresh
    refreshId: PropTypes.string
};

const Mission = (props) => {

    const getColorClassName = () => {
        const {statusId} = props;
        if (statusId === 1) {
            return 'waiting';
        }
        else if (statusId === 2) {
            return 'working'
        }
        else return 'done';
    }

    const {title, description, connectDragSource} = props;
    const colorClassName = getColorClassName();
    return connectDragSource(
        <div className={'mission ' + colorClassName}>
            <div className='mission-title'>{title}</div>
            <div className='mission-description'>{description}</div>
        </div>
    );
};

Mission.propTypes = propTypes;

const collect = (connect) => ({
    connectDragSource: connect.dragSource()
})

export default withRefreshId(
    DragSource(Types.mission, missionSource, collect)(Mission));