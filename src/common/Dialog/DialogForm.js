import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    open : PropTypes.bool.isRequired,
    children : PropTypes.node.isRequired,
};

class DialogForm extends Component {
    render() {
        const {open, children} = this.props;
        return (
            <Fragment>
                {open &&
                    React.Children.only(children)
                }
            </Fragment>
        );
    }
}

DialogForm.propTypes = propTypes;

export default DialogForm;
