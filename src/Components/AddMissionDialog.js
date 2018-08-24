import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Button, TextField } from '@material-ui/core';

const propTypes = {};

class AddMissionDialog extends Component {
    render() {
        const {open, onClose} = this.props;
        return (
            <Dialog
                open={open}
                close={onClose}
                >
                <DialogTitle id='title'>Add Mission</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={onClose} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

AddMissionDialog.propTypes = propTypes;

export default AddMissionDialog;
