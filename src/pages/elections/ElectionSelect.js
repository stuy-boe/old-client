import React from "react";
import {ElectionCard} from "./ElectionCard";

import {Grid, GridCell} from "@rmwc/grid";
import '@material/layout-grid/dist/mdc.layout-grid.css';
import {Helmet} from "react-helmet";
import {Loading} from "../../comps/Loading";
import backend from "../../utils/backend";

export class ElectionSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: [],
			completed: [],
			error: false,
			loaded: false
		};

		this.fetchElections = this.fetchElections.bind(this);
	}

	fetchElections(){
		this.setState({error: false});
		backend.get("/api/elections")
			.then(({data}) => this.setState({loaded: true, data: data.payload}));
	}

	componentDidMount() {
		this.fetchElections();
	}

	render() {

		if(! this.state.loaded)
			return (
				<Loading
					error={this.state.error}
					errorMessage={"There was an error getting the elections."}
					onRetry={this.fetchElections}
					/>
			);

		return (
			<div>
				<Helmet>
					<title>Elections | Stuy BOE Voting Site</title>
					<meta property="og:title" content="Elections | Stuy BOE Voting Site"/>
					<meta property="og:description" content="View results of elections from the past as well as up to date information about current elections."/>
				</Helmet>

				<h2>Active Elections:</h2>
				<Grid fixedColumnWidth align={"left"}>
					{this.state.active.map(election => (
						<ElectionCell election={election} key={election.publicUrl} />
					))}
				</Grid>

				<h2>Completed Elections:</h2>
				<Grid fixedColumnWidth align={"left"}>
					{this.state.completed.map(election => (
						<ElectionCell election={election} key={election.publicUrl} />
					))}
				</Grid>
			</div>
		)
	}
}

const ElectionCell = ({election}) => (
	<GridCell span={4}>
		<ElectionCard to={"/elections/:publicUrl"} election={election}/>
	</GridCell>
);
