import React from 'react';
import AppContext from '../comps/context/AppContext';
import { Switch, Route } from 'react-router-dom';
import AdminElectionsRouter from '../comps/admin/AdminElectionsRouter';
import SignInRequired from './SignInRequired';
import Error403 from './Error403';

const Admin = ({ match }) => {
	const context = React.useContext(AppContext);
	if (!context.signedIn) {
		return <SignInRequired />;
	}

	// TODO: make this route pretty for non-admins
	if (!context.admin.status) {
		return <Error403 />;
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
