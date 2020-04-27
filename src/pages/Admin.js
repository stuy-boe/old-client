import React from 'react';
import AppContext from '../comps/context/AppContext';
import Title from '../typography/Title';
import { Switch, Route } from 'react-router-dom';
import AdminElectionsRouter from '../comps/admin/AdminElectionsRouter';

const Admin = ({ match }) => {
	const context = React.useContext(AppContext);

	// TODO: make this route pretty for non-admins
	if (!context.admin.status) {
		return (
			<div>
				<Title level={2}>You don't have access to this route.</Title>
			</div>
		);
	}

	return (
		<div>
			<Switch>
				<Route
					path={`${match.path}/elections`}
					component={AdminElectionsRouter}
				/>
			</Switch>
		</div>
	);
};

export default Admin;
