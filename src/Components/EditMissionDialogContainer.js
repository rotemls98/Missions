import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getMission} from "../Manager/MissionManager";
import EditMissionDialog from "./EditMissionDialog";

const propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    id : PropTypes.number,
};

class EditMissionDialogContainer extends Component {

    constructor(props) {
        super(props);

        this.resetInitialValues = this.resetInitialValues.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.open !== this.props.open && this.props.open) {
            this.getMission();
        }
    }

    getMission() {
        getMission(this.props.id).then(m =>
            this.setState({title : m.title, description : m.description}));
    }

    resetInitialValues() {
        this.setState({title: null, description: null});
    }

    render() {
        return (
            <EditMissionDialog {...this.props} onExited={this.resetInitialValues} initialValues={{...this.state}}/>
        );
    }
}

EditMissionDialogContainer.propTypes = propTypes;

export default EditMissionDialogContainer;
