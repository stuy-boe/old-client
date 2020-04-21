// @flow
import React from 'react';
import AdminTabs from '../comps/admin/AdminTabs';
import { AppContext } from '../comps/AppProvider';
import Title from '../typography/Title';

const Admin = () => {
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
			<AdminTabs />
		</div>
	);
};

export default Admin;
