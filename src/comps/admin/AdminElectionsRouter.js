// @flow
import React from 'react';
import backend from '../../utils/backend';

const AdminElectionsRouter = () => {
	const [elections, setElections] = React.useState([]);

	React.useEffect(() => {
		backend
			.get('/api/admin/elections/list')
			.then(({ data }) => setElections(data.payload));
	}, []);

	return (
		<div>
			{elections.map(i => (
				<p>{JSON.stringify(i)}</p>
			))}
		</div>
	);
};

export default AdminElectionsRouter;
