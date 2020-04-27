import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Overview } from './Overview';
import Loading from '../../utils/Loading';
import { Helmet } from 'react-helmet';
import Vote from './Vote';
import Candidates from './Candidates';
import Results from './Results';
import urlJoin from 'url-join';
import backend from '../../../tools/backend';
import { API_URL } from '../../../constants';
import Text from '../../../typography/Text';
import Retry from '../../utils/Retry';
import FlexCenter from '../../utils/FlexCenter';

import withStyles from 'react-jss';
import Title from '../../../typography/Title';
import BackButton from '../../utils/BackButton';

const styles = {
	ErrorImage: {
		height: '400px',
		maxWidth: '80%'
	},
	ErrorText: {
		color: '#ed747c;'
	}
};

export const ElectionContext = React.createContext({});

class SelectedElectionRouter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			status: 'loading',
			election: {}
		};

		this.fetchElection = this.fetchElection.bind(this);
	}

	fetchElection() {
		this.setState({ status: 'loading' });
		const { publicUrl } = this.props.match.params;

		backend
			.get(`/api/elections/${publicUrl}`)
			.then(({ data }) =>
				this.setState({
					status: 'loaded',
					election: data.payload
				})
			)
			.catch(er => {
				console.log(er.response);
				if (er.response && er.response.status === 404) {
					this.setState({ status: 'loaded', election: null });
				} else {
					this.setState({ status: 'error' });
				}
			});
	}

	componentDidMount(): void {
		this.fetchElection();
	}

	render(): React.ReactNode {
		if (this.state.status === 'loading') {
			return <Loading />;
		}

		if (this.state.status === 'error') {
			return (
				<Retry
					onRetry={this.fetchElection}
					message={'We ran into an issue getting that election'}
				/>
			);
		}

		if (this.state.election === null) {
			return (
				<div>
					<Helmet>
						<title>Election Not Found | Stuy BOE Voting Site</title>
						<meta
							property="og:title"
							content={`Election Not Found | Stuy BOE Voting Site`}
						/>
						<meta
							property="og:description"
							content={`There is no election at that url... yet!`}
						/>
					</Helmet>
					<BackButton text={'All Elections'} to={'/elections'} />
					<Title
						center
						level={2}
						className={this.props.classes.ErrorText}
					>
						Election Not Found
					</Title>
					<FlexCenter>
						<img
							src={'/img/cherry-no-comments.svg'}
							alt={'Woman doing a shocked gasp'}
							className={this.props.classes.ErrorImage}
						/>
					</FlexCenter>

					<Text center className={this.props.classes.ErrorText}>
						Looks like that election... doesn't exist.
					</Text>
				</div>
			);
		}

		return (
			<div>
				<Helmet>
					<meta
						property="og:image"
						content={urlJoin(
							API_URL,
							`/api/s3`,
							this.state.election.picture,
							`?flags=lossy`,
							`?quality=auto`
						)}
					/>
				</Helmet>

				<Switch>
					<ElectionContext.Provider value={this.state.election}>
						<Route
							path={this.props.match.path}
							exact
							component={Overview}
						/>
						<Route
							path={this.props.match.path + '/candidates'}
							exact
							component={Candidates}
						/>
						<Route
							path={this.props.match.path + '/vote'}
							exact
							component={Vote}
						/>
						<Route
							path={this.props.match.path + '/results'}
							exact
							component={Results}
						/>
					</ElectionContext.Provider>
				</Switch>
			</div>
		);
	}
}

export default withStyles(styles)(SelectedElectionRouter);
