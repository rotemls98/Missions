import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addComponent, refreshComponents, removeComponent} from "../actions/actions";
import uuidv4 from 'uuid';

export const RefreshIdContext = React.createContext('refreshId');

function withRefreshChild(WrappedComponent) {
    return connect(mapRefreshStateToProps, mapDispatchToProps)(
        class extends Component {

            constructor(props) {
                super(props);

                if (!props.refreshId) {
                    throw Error("refresh id must be specifed");
                }
            }

            componentDidMount() {
                this.props.addComponent(this.props.refreshId);
            }

            componentWillUnmount() {
                this.props.removeComponent(this.props.refreshId);
            }

            render() {
                const {refreshId} = this.props;
                return (
                    <RefreshIdContext.Provider value={refreshId}>
                        <WrappedComponent
                            refreshId={refreshId}
                            {...this.props}
                        />
                    </RefreshIdContext.Provider>
                )
            }

        })
}

export const refreshSelector = (refreshState, ownProps) => {
    return refreshState.find(refresh => refresh.id === ownProps.refreshId);
}

export const mapRefreshStateToProps = (state, ownProps) => {
    const refreshData = refreshSelector(state, ownProps);
    return {
        timestamp: refreshData ? refreshData.timestamp : undefined
    }
}


export const mapDispatchToProps = (dispatch) => ({
    addComponent: (id) => dispatch(addComponent(id)),
    refreshComponents: (...componentsToRefresh) =>
        dispatch(refreshComponents(...componentsToRefresh)),
    removeComponent: (id) => removeComponent(id),
})

export default withRefreshChild;




