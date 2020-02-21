import React, {useEffect} from "react";
import {ElectionContext} from "./SelectedElectionRouter";
import {Loading} from "../../../comps/Loading";
import {Helmet} from "react-helmet";


export const Candidates: React.FC = props => {
	const election = React.useContext(ElectionContext);
	const [loaded, setLoaded] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [candidates, setCandidates] = React.useState([]);

	const getCandidates = () => {
		fetch(`${process.env.REACT_APP_API_URL}/api/elections/${election.publicUrl}/candidates`)
			.then(res => res.json())
			.then(res => setCandidates(res.payload) && setLoaded(true))
			.catch(() => setError(true));
	};

	useEffect(getCandidates, []);

	if(! loaded)
		return (
			<Loading
				error={error}
				errorMessage={"There was an error getting the candidates for this election."}
				onRetry={getCandidates}
			/>
		);

	return (
		<div>
			<Helmet>
				<title>Candidates: {election.name} | Stuy BOE Voting Site</title>
				<meta property="og:title" content={`Candidates: ${election.name} | Stuy BOE Voting Site`}/>
				<meta property="og:description" content={`Meet the candidates for ${election.name}.`}/>
			</Helmet>

			{/* TODO: Display the different candidates, ask web team for input */}
			{/* TODO Create individual page for candidate */}
			{JSON.stringify(candidates)}
		</div>
	);
};
