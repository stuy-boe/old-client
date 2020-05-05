import React from 'react';
import { List, SimpleListItem } from '@rmwc/list';
import backend from '../../../tools/backend';
import Title from '../../../typography/Title';
import Loading from '../../utils/Loading';
import Retry from '../../utils/Retry';
import FlexCenter from '../../utils/FlexCenter';
import { Button } from '@rmwc/button';
import { Link } from 'react-router-dom';

const ElectionsList = ({ match }) => {
	const [elections, setElections] = React.useState([]);
	const [status, setStatus] = React.useState('loading');

	const loadElections = () => {
		backend
			.get('/api/admin/elections/list')
			.then(({ data }) => {
				setElections(data.payload);
				setStatus('loaded');
			})
			.catch(() => {
				setStatus('error');
			});
	};

	React.useEffect(loadElections, []);

	return (
		<div>
			<Title level={2} center>
				Manage Elections
			</Title>
			<FlexCenter>
				<Link to={`${match.path}/create`}>
					<Button outlined>Create Election</Button>
				</Link>
			</FlexCenter>

			{status === 'loading' && <Loading />}
			{status === 'error' && (
				<Retry
					onRetry={loadElections}
					message={'There was an error getting the elections'}
				/>
			)}
			<List twoLine>
				{elections.map(election => {
					return (
						<Link
							to={`${match.path}/${election.publicUrl}`}
							key={election.id}
						>
							<SimpleListItem
								key={election.publicUrl}
								graphic={
									election.completed
										? 'offline_pin'
										: 'track_changes'
								}
								text={election.name}
								secondaryText={election.publicUrl}
								meta={<p>MANAGE</p>}
							/>
						</Link>
					);
				})}
			</List>
		</div>
	);
};

export default ElectionsList;
