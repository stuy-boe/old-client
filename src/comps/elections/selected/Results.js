import React from 'react';
import { ElectionContext } from './SelectedElectionRouter';
import { Helmet } from 'react-helmet';

export const Results = props => {
	const election = React.useContext(ElectionContext);

	return (
		<div>
			<Helmet>
				<title>Results: {election.name} | Stuy BOE Voting Site</title>
				<meta
					property="og:title"
					content={`Results: ${election.name} | Stuy BOE Voting Site`}
				/>
				<meta
					property="og:description"
					content={`View results for ${election.name}.`}
				/>
			</Helmet>

			{!election.publicResults && (
				<p>Results are currently not available for this election.</p>
			)}

			{/*	TODO: Early result viewing for people who are admins */}
			{/* TODO: Create API endpoint for getting results and make fetch request to endpoint */}
			{/* TODO: Result Viewing handlers based on the type of election */}
		</div>
	);
};
