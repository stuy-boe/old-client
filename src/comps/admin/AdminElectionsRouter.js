import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ElectionsList from './elections/ElectionsList';
import CreateElection from './elections/CreateElection';

const AdminElectionsRouter = ({ match }) => {
	return (
		<div>
			<Switch>
				<Route path={match.path} exact component={ElectionsList} />
				<Route
					path={`${match.path}/create`}
					exact
					component={CreateElection}
				/>
			</Switch>
		</div>
	);
};

export default AdminElectionsRouter;
