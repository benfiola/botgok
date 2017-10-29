import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Plugins as Actions } from '../../actions/index.jsx';

export class PluginsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        return this.props.onCreate();
    }

    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Version
                        </th>
                        <th>
                            Path
                        </th>
                        <th>
                            Active
                        </th>
                        <th>
                            Missing
                        </th>
                    </tr>
                </thead>
                <tbody>
                {this.props.plugins.map((plugin)=>(
                    <tr>
                        <td>{plugin.name}</td>
                        <td>{plugin.version}</td>
                        <td>{plugin.path}</td>
                        <td>{String(plugin.active)}</td>
                        <td>{String(plugin.missing)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        plugins: state.plugins.plugins
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCreate() {
            dispatch(Actions.onCreate());
        }
    }
}

export const PluginsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PluginsComponent);