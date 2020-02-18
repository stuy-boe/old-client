import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {Helmet} from "react-helmet/es/Helmet";

import {resolve as resolveUrl} from "url";

export function Overview(props) {
	const { public_url } = useParams();

	const [electionData, setElectionData] = React.useState(null);
	const [loaded, setLoaded] = React.useState(false);


	useEffect(() => {
		if(! loaded)
			fetch(`${process.env.REACT_APP_API_URL}/api/elections/${public_url}`, {credentials: "include"})
				.then(res => res.json())
				.then(data => {
					setLoaded(true);

					if(data.success)
						setElectionData(data.payload);

				});

	}, [loaded]);

	return (
		<div>
			{loaded && electionData &&
				<Helmet>
					<title>{electionData.name} | Stuy BOE Voting Site</title>
					<meta property="og:title" content={`${electionData.name} | Stuy BOE Voting Site`}/>
					<meta property="og:description" content={`Overview of ${electionData.name}. Vote, view updates, learn about candidates and more.`}/>
					<meta property="og:image" content={resolveUrl(process.env.REACT_APP_API_URL, electionData.picture)}/>
				</Helmet>
			}

			{loaded && ! electionData &&
				<Helmet>
					<title>Election Not Found | Stuy BOE Voting Site</title>
					<meta property="og:title" content={`Election Not Found | Stuy BOE Voting Site`}/>
					<meta property="og:description" content={`There is no election at that url... yet!`}/>
				</Helmet>
			}

			{public_url} is the current election
		</div>
	)
}
