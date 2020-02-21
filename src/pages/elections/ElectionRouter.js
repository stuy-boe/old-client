import React from "react";
import {Route, Switch} from "react-router-dom";
import {ElectionSelect} from "./ElectionSelect";
import {SelectedElectionRouter} from "./selected/SelectedElectionRouter";

export const ElectionRouter = () => {
	return (
		<Switch>
			<Route path={"/elections"} exact component={ElectionSelect} />
			<Route path={"/elections/:publicUrl"} component={SelectedElectionRouter} />
		</Switch>
	)
};
