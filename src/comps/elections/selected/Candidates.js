import React, { useEffect } from 'react';
import { ElectionContext } from './SelectedElectionRouter';
import Loading from '../../Loading';
import { Helmet } from 'react-helmet';
import backend from '../../../utils/backend';
import Retry from '../../Retry';

const Candidates = () => {
	const election = React.useContext(ElectionContext);
	const [status, setStatus] = React.useState('loading');
	const [candidates, setCandidates] = React.useState([]);

	const getCandidates = () => {
		backend
			.get(`/api/elections/${election.publicUrl}/candidates`)
			.then(({ data }) => {
				setCandidates(data.payload);
				setStatus('loaded');
			})
			.catch(() => {
				setStatus('error');
			});
	};

	useEffect(getCandidates, []);

	if (status === 'loading') {
		return <Loading />;
	}

	if (status === 'error') {
		return (
			<Retry
				onRetry={getCandidates}
				message={'There was an error getting the candidates'}
			/>
		);
	}

	return (
		<div>
			<Helmet>
				<title>
					Candidates: {election.name} | Stuy BOE Voting Site
				</title>
				<meta
					property="og:title"
					content={`Candidates: ${election.name} | Stuy BOE Voting Site`}
				/>
				<meta
					property="og:description"
					content={`Meet the candidates for ${election.name}.`}
				/>
			</Helmet>

			{/* TODO: Display the different candidates, ask web team for input */}
			{/* TODO Create individual page for candidate */}
			{JSON.stringify(candidates)}
		</div>
	);
};

export default Candidates;
