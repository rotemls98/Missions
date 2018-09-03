import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import {Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField} from '@material-ui/core';
import {Zoom} from '@material-ui/core'

const propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Required'
    }
    return errors;
};

const renderTextField = ({
                             input,
                             label,
                             meta: {touched, error},
                             ...custom
                         }) => {

    return <TextField
        label={label}
        error={touched && Boolean(error)}
        helperText={touched && error}
        {...input}
        {...custom}
    />
};

const initialState = {
    title: '',
    description: '',
};

class AddMissionDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {...initialState, prevOpen: false};

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.open !== prevState.prevOpen) {
            if (nextProps.open) {
                return {...initialState, prevOpen: nextProps.open}
            }
            return {prevOpen: nextProps.open};
        }
        return null;
    }


    handleTitleChange(e) {
        this.setState({title: e.target.value});
    }

    handleDescriptionChange(e) {
        this.setState({description: e.target.value});
    }

    isFormValid() {
        return this.state.title.length !== 0;
    }

    handleSubmit() {
        const {title, description} = this.state;
        this.props.onSubmit(title, description);
    }

    handleClose() {
        this.props.onClose();
    }

    render() {
        const {open} = this.props;
        const isValid = this.isFormValid();
        const errorMessage = !isValid ? "title cant be empty" : "";
        const {title, description} = this.state;
        const prefix = {

        }
        return (
            <Dialog
                onExited={() => this.props.reset()}
                transitionDuration={400}
                TransitionComponent={Zoom}
                disableBackdropClick
                open={open}
                onClose={this.handleClose}
            >
                <DialogTitle style={{backgroundColor: 'blue'}}>Add Mission</DialogTitle>
                <DialogContent>
                    {/*<Field*/}
                        {/*fullWidth*/}
                        {/*name='title'*/}
                        {/*label='Title'*/}
                        {/*component={renderTextField}*/}
                    {/*/>*/}
                    <TextField
                    // error={!isValid}
                    // helperText={errorMessage}
                    autoFocus
                    value={title}
                    onChange={this.handleTitleChange}
                    margin="dense"
                    id='title'
                    label="Title"
                    type="text"
                    fullWidth
                    />
                    <TextField
                        value={description}
                        onChange={this.handleDescriptionChange}
                        margin="dense"
                        id='description'
                        label="Description"
                        type="text"
                        multiline
                        rowsMax={10}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                    <Button
                        id='submit'
                        onClick={this.handleSubmit}
                        color="primary"
                        disabled={!isValid}
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
    undefined,
})(AddMissionDialog);



