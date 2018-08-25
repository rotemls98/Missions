import React, {Component} from 'react';
import { RefreshIdContext} from './withRefresh';


function withRefreshId(WrappedComponent) {
    return class extends Component {
        render() {
            return (
                <RefreshIdContext.Consumer>
                    { refreshId =>
                        <WrappedComponent
                            refreshId={refreshId}
                            {...this.props}
                        />
                    }
                </RefreshIdContext.Consumer>
            )
        }
    }
}

export default withRefreshId;