import React from 'react';
import { ElectionContext } from './SelectedElectionRouter';
import { Helmet } from 'react-helmet';
import moment from 'moment-timezone';

export const Vote: React.FC = () => {
	const election = React.useContext(ElectionContext);

	const startTimestring = moment(election.startTime)
		.tz('America/New_York')
		.format('LLLL z');

	return (
		<div>
			<Helmet>
				<title>Vote: {election.name} | Stuy BOE Voting Site</title>
				<meta
					property="og:title"
					content={`Vote: ${election.name} | Stuy BOE Voting Site`}
				/>
				<meta
					property="og:description"
					content={`Vote for ${election.name}. Starts ${startTimestring}.`}
				/>
			</Helmet>

			{/*	TODO: Render different vote collection handlers based on the type of election */}
			{/* TODO: Check user's eligibility to vote. */}
		</div>
	);
};

export default Vote;
