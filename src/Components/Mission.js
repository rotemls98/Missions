import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';
import {Types} from "../DragTypes";
import withRefreshId from "../common/hoc/withRefreshId";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import './Mission.css';
import {withStyles} from "@material-ui/core";

const missionSource = {
    beginDrag: (props) => ({
        id: props.id,
        statusId: props.statusId,
        refreshId: props.refreshId
    })
};

const propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    statusId: PropTypes.oneOf([1, 2, 3]).isRequired,
    onArrowClick: PropTypes.func.isRequired,
    showArrow: PropTypes.bool.isRequired,
    onMissionClick: PropTypes.func.isRequired,

    // from withStyles HOC
    classes: PropTypes.object.isRequired,

    // injected from withRefreshId
    refreshId: PropTypes.string.isRequired
};

const styles = {
    root: {
        fontSize: '16px'
    }
};

class Mission extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        };

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleArrowClick = this.handleArrowClick.bind(this);
        this.handleMissionClick = this.handleMissionClick.bind(this);
    }

    handleArrowClick(e) {
        e.stopPropagation();
        this.props.onArrowClick(this.props.id);
    }

    handleMouseEnter() {
        this.setState({hover: true});
    }

    handleMouseLeave() {
        this.setState({hover: false});
    }

    // ugly
    getColorClassName() {
        const {statusId} = this.props;
        if (statusId === 1) {
            return 'waiting';
        }
        else if (statusId === 2) {
            return 'working'
        }
        else return 'done';
    };

    handleMissionClick() {
        const {id, title, description, refreshId} = this.props;
        this.props.onMissionClick({
            id,
            title,
            description
        }, refreshId);
    }

    render() {
        const {title, description, connectDragSource, classes, showArrow} = this.props;
        const colorClassName = this.getColorClassName();
        const {hover} = this.state;
        return connectDragSource(
            <div
                className={'mission ' + colorClassName}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleMissionClick}
            >
                <div className='mission-header'>
                    <div id='mission-title' className='mission-title'>{title}</div>
                    <div className={!showArrow || !hover ? 'arrow-invisible' : ''}>
                        <ArrowUpwardIcon
                            classes={{root: classes.root}}
                            onClick={this.handleArrowClick}
                        />
                    </div>
                </div>
                <div id='mission-description' className='mission-description'>{description}</div>
            </div>
        );
    }
}


Mission.propTypes = propTypes;

const collect = (connect) => ({
    connectDragSource: connect.dragSource()
});

export default withRefreshId(
    DragSource(Types.mission, missionSource, collect)(withStyles(styles)(Mission)));