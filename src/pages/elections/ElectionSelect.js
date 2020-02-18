import React from "react";
import {MessageQueue} from "../../comps/MessageQueue";
import {ElectionCard} from "./ElectionCard";

import {Grid, GridCell} from "@rmwc/grid";
import '@material/layout-grid/dist/mdc.layout-grid.css';
import {Helmet} from "react-helmet/es/Helmet";

export class ElectionSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: [],
			completed: []
		};

		this.setStateFromFetch = this.setStateFromFetch.bind(this);
	}

	setStateFromFetch(){
		fetch(`${process.env.REACT_APP_API_URL}/api/elections`, {cache: "default", credentials: "include"})
			.then(res => res.json())
			.then(data => this.setState(data))
			.catch(er => {
				MessageQueue.notify({
					body: "Could not fetch elections. Check your network connection.",
					actions: [{"icon": "close"}]
				});
			});
	}

	componentDidMount() {
		this.setStateFromFetch();
	}

	render() {
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
						<ElectionCell election={election} key={election.public_url} />
					))}
				</Grid>

				<h2>Completed Elections:</h2>
				<Grid fixedColumnWidth align={"left"}>
					{this.state.completed.map(election => (
						<ElectionCell election={election} key={election.public_url} />
					))}
				</Grid>
			</div>
		)
	}
}

const ElectionCell = ({election}) => (
	<GridCell span={4}>
		<ElectionCard to={"/elections/:public_url"} election={election}/>
	</GridCell>
);
