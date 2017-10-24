import React from 'react';
import { Page, Title } from '../Shared/index.jsx';

export class Loading extends React.Component {
    render() {
        return (
            <Page loading={!this.props.loading}>
                <Title>Loading</Title>
            </Page>
        )
    }
}