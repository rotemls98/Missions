import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import {Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField} from '@material-ui/core';
import {Zoom} from '@material-ui/core'

const propTypes = {
    // onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Required'
    }
    else if(values.title.length > 20) {
        errors.title = 'Title must be 20 characters or less';
    }
    return errors;
};

const renderTextField = ({
                             input,
                             label,
                             meta: {touched, error},
                             ...custom
                         }) => {
    console.log('render');
    return <TextField
        label={label}
        error={touched && Boolean(error)}
        helperText={touched && error}
        {...input}
        {...custom}
    />
};

class AddMissionDialog extends Component {

    constructor(props) {
        super(props);

        this.handleExited = this.handleExited.bind(this);
    }

    handleExited() {
        // set timeout is required so the method will be called after all fields are unregistered
        setTimeout(() => {
            this.props.initialize(1); // value need to be different from initial
            this.props.destroy();
        });
    }


    render() {
        const {invalid, handleSubmit, onClose} = this.props;
        return (
            <Dialog
                onClose={onClose}
                onExited={this.handleExited}
                transitionDuration={400}
                TransitionComponent={Zoom}
                disableBackdropClick
                open={this.props.open}
            >
                <DialogTitle style={{backgroundColor: '#3e3e7d'}}>Add Mission</DialogTitle>
                <DialogContent>
                    <Field
                        fullWidth
                        autoFocus
                        margin="dense"
                        name='title'
                        label='Title'
                        component={renderTextField}
                    />
                    <Field
                        margin="dense"
                        name='description'
                        label="Description"
                        type="text"
                        multiline
                        rowsMax={10}
                        fullWidth
                        component={renderTextField}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Close
                    </Button>
                    <Button
                        id='submit'
                        onClick={handleSubmit}
                        color="primary"
                        disabled={invalid}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}


AddMissionDialog.propTypes = propTypes;


export default reduxForm({
    form: 'AddMission',
    validate,
})(AddMissionDialog);



