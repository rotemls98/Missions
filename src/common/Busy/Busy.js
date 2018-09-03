import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CircularProgress} from '@material-ui/core';

const propTypes = {
    isLoading : PropTypes.bool.isRequired,
    hideContent : PropTypes.bool.isRequired,
    children : PropTypes.node.isRequired,
};

class Busy extends Component {
    render() {
        const {isLoading} = this.props;
        return (
            <div className={'busy'}>
                {React.Children.only(this.props.children)}
                <CircularProgress/>
            </div>
        );
    }
}

Busy.propTypes = propTypes;

export default Busy;
