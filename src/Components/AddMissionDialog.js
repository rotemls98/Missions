import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField } from '@material-ui/core';

const propTypes = {
    open : PropTypes.bool.isRequired,
    onClose : PropTypes.func.isRequired,
    onSubmit : PropTypes.func.isRequired,
};

class AddMissionDialog extends Component {

    constructor(props) {
        super(props);

        this.initialState= {
            title : '',
            description : '',
        };

        this.state = this.initialState;

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleTitleChange(e) {
        this.setState({title : e.target.value});
    }

    handleDescriptionChange(e) {
        this.setState({description : e.target.value});
    }

    isFormValid() {
        return this.state.title.length !== 0;
    }

    handleSubmit() {
        const {title, description} = this.state;
        this.props.onSubmit(title, description);
        this.resetState();
    }

    handleClose() {
        this.props.onClose();
        this.resetState();
    }

    resetState() {
        this.setState({...this.initialState});
    }

    render() {
        const {open} = this.props;
        const {title, description} = this.state;
        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                >
                <DialogTitle>Add Mission</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={title}
                        onChange={this.handleTitleChange}
                        margin="dense"
                        id={title}
                        label="title"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        value={description}
                        onChange={this.handleDescriptionChange}
                        margin="dense"
                        id={description}
                        label="description"
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
                        onClick={this.handleSubmit}
                        color="primary"
                        disabled={!this.isFormValid()}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

AddMissionDialog.propTypes = propTypes;

export default AddMissionDialog;
