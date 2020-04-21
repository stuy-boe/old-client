// @flow
import React from 'react';

import { TabBar, Tab } from '@rmwc/tabs';
import '@rmwc/tabs/styles';
import { Link, useRouteMatch } from 'react-router-dom';
import { AppContext } from '../AppProvider';

const AdminTabs = () => {
	const context = React.useContext(AppContext);
	const adminPrivileges = context.admin.privileges;

	const pageMatch = useRouteMatch({
		path: '/admin/:page',
		strict: false,
		sensitive: false
	});

	const page = pageMatch ? pageMatch.params.page : '';
	const pageIndex = adminPrivileges.indexOf(page);

	const [activeTab] = React.useState(pageIndex);

	return (
		<TabBar activeTabIndex={activeTab}>
			{adminPrivileges.map((privilege, index) => {
				return (
					<Link to={`/admin/${privilege}`} key={index}>
						<Tab>{privilege}</Tab>
					</Link>
				);
			})}
		</TabBar>
	);
};

export default AdminTabs;
