import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addComponent, refreshComponents, removeComponent} from "../../actions/actions";
import {getRefresh} from "../../App";

export const RefreshIdContext = React.createContext('refreshId');

function withRefresh(WrappedComponent) {
    return connect(mapRefreshStateToProps, mapDispatchToProps)(
        class extends Component {

            constructor(props) {
                super(props);

                if (!props.refreshId) {
                    throw Error("refresh id must be specified");
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
                        {React.Children.only(
                            <WrappedComponent
                                refreshId={refreshId}
                                {...this.props}
                            />
                        )}
                    </RefreshIdContext.Provider>
                )
            }

        })
}


export const mapRefreshStateToProps = (state, {refreshId}) => {
    const refreshData = getRefresh(state, refreshId);
    return {
        timestamp: refreshData ? refreshData.timestamp : undefined
    }
};

export const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        addComponent,
        refreshComponents,
        removeComponent,
    },
    dispatch
);

export default withRefresh;




