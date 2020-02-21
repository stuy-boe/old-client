import React from "react";
import {Route, Switch} from "react-router-dom";
import {Overview} from "./Overview";
import {Loading} from "../../../comps/Loading";
import {Helmet} from "react-helmet";
import {Vote} from "./Vote";
import {Candidates} from "./Candidates";
import {Results} from "./Results";
import {resolve as resolveUrl} from "url";

export const ElectionContext = React.createContext({});

export class SelectedElectionRouter extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			error: false,
			election: {}
		};

		this.fetchElection = this.fetchElection.bind(this);
	}

	fetchElection(){
		this.setState({error: false});
		const {publicUrl} = this.props.match.params;

		fetch(`${process.env.REACT_APP_API_URL}/api/elections/${publicUrl}`)
			.then(res => res.json())
			.then(res => this.setState({ loaded: true, election: res.payload }))
			.catch(() => this.setState({error: true}))
	}

	componentDidMount(): void {
		this.fetchElection();
	}

	render() : React.ReactNode {
		if(! this.state.loaded)
			return (
				<Loading
					error={this.state.error}
					onRetry={this.fetchElection}
					errorMessage={"We weren't able to get the details for that election."}
				/>
			);

		if(this.state.election === null)
			return (
				<div>
					<Helmet>
						<title>Election Not Found | Stuy BOE Voting Site</title>
						<meta property="og:title" content={`Election Not Found | Stuy BOE Voting Site`}/>
						<meta property="og:description" content={`There is no election at that url... yet!`}/>
					</Helmet>
					<p>That election doesn't exist</p>
				</div>
			);


		return (
			<div>
				<Helmet>
					<meta property="og:image" content={resolveUrl(process.env.REACT_APP_API_URL, this.state.election.picture)}/>
				</Helmet>

				<Switch>
					<ElectionContext.Provider value={this.state.election}>
						<Route path={this.props.match.path} exact component={Overview} />
						<Route path={this.props.match.path + "/candidates"} exact component={Candidates} />
						<Route path={this.props.match.path + "/vote"} exact component={Vote} />
						<Route path={this.props.match.path + "/results"} exact component={Results} />
					</ElectionContext.Provider>
				</Switch>
			</div>
		);
	}
}