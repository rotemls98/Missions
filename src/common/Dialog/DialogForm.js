import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dialog} from '@material-ui/core';

const propTypes = {
    // render: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onExited: PropTypes.func.isRequired,
};

class DialogForm extends Component {
    state = {
        open: true
    };

    handleExited = () => {
        this.props.onExited();
    };

    handleClose = () =>  {
        console.log(1);
        this.setState({open : false});
    };

    render() {

        const otherProps = {...this.props};
        delete otherProps.open;
        delete otherProps.children;
        return (
            <Dialog open={this.state.open}
                    onClose={this.handleClose}
                    onExited={this.handleExited}
                    {...this.props}>
                {this.props.children}
            </Dialog>
        )
    }
}

DialogForm.propTypes = propTypes;

export default DialogForm;
