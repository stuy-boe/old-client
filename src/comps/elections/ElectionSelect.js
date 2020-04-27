import React from 'react';
import ElectionCard from './ElectionCard';

import { Grid, GridCell } from '@rmwc/grid';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import { Helmet } from 'react-helmet';
import Loading from '../utils/Loading';
import backend from '../../tools/backend';
import Retry from '../utils/Retry';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	ElectionsContainer: {
		maxWidth: '100%'
	}
});

const ElectionSelect = () => {
	const [elections, setElections] = React.useState({
		active: [],
		completed: []
	});
	const [status, setStatus] = React.useState('loading');

	const getElections = () => {
		backend
			.get('/api/elections')
			.then(res => {
				setElections(res.data.payload);
				setStatus('loaded');
			})
			.catch(() => {
				setStatus('error');
			});
	};

	React.useEffect(getElections, []);

	if (status === 'loading') {
		return <Loading />;
	}

	if (status === 'error') {
		return (
			<Retry
				onRetry={getElections}
				message={'There was an error getting the elections.'}
			/>
		);
	}

	return (
		<div>
			<Helmet>
				<title>Elections | Stuy BOE Voting Site</title>
				<meta
					property="og:title"
					content="Elections | Stuy BOE Voting Site"
				/>
				<meta
					property="og:description"
					content="View results of elections from the past as well as up to date information about current elections."
				/>
			</Helmet>

			<h2>Active Elections:</h2>
			<ElectionGrid elections={elections.active} />

			<h2>Completed Elections:</h2>
			<ElectionGrid elections={elections.completed} />
		</div>
	);
};

const ElectionGrid = ({ elections }) => {
	const classes = useStyles();

	return (
		<Grid
			fixedColumnWidth
			align={'left'}
			className={classes.ElectionsContainer}
		>
			{elections.map(election => (
				<ElectionCell election={election} key={election.publicUrl} />
			))}
		</Grid>
	);
};

const ElectionCell = ({ election }) => (
	<GridCell span={4}>
		<ElectionCard to={'/elections/:publicUrl'} election={election} />
	</GridCell>
);

export default ElectionSelect;
