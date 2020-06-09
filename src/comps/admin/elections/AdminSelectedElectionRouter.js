import React from 'react';
import AdminElectionOverview from './AdminElectionOverview';
import { Route, Switch, useParams } from 'react-router-dom';
import backend from '../../../tools/backend';
import AdminElectionContext from './AdminElectionContext';
import Loading from '../../utils/Loading';
import Retry from '../../utils/Retry';
import ErrorPage from '../../../pages/ErrorPage';
import SearchingVector from '../../../vectors/searching.svg';
import BackButton from '../../utils/BackButton';
import EditElection from './EditElection';

const AdminSelectedElectionRouter = ({ match }) => {
	const { publicUrl } = useParams();
	const [election, setElection] = React.useState(null);
	const [status, setStatus] = React.useState('loading');

	const getElectionData = () => {
		backend
			.get(`/api/admin/elections/${publicUrl}`)
			.then(res => {
				setElection(res.data.payload);
				setStatus('loaded');
			})
			.catch(e => {
				if (e.response && e.response.status === 404) {
					setStatus('loaded');
				} else {
					setStatus('error');
				}
			});
	};

	React.useEffect(getElectionData, []);

	if (status === 'loading') {
		return <Loading />;
	}

	if (status === 'error') {
		return (
			<Retry
				onRetry={getElectionData}
				message={'There was an error getting the election information.'}
			/>
		);
	}

	if (election === null) {
		return (
			<ErrorPage
				title={'Election Not Found'}
				image={SearchingVector}
				back={
					<BackButton
						text={'Manage Elections'}
						to={'/admin/elections'}
					/>
				}
			/>
		);
	}

	return (
		<AdminElectionContext.Provider value={election}>
			<Switch>
				<Route
					path={match.path}
					exact
					component={AdminElectionOverview}
				/>

				<Route path={`${match.path}/candidates/create`} />
				<Route path={`${match.path}/edit`} component={EditElection} />
			</Switch>
		</AdminElectionContext.Provider>
	);
};

export default AdminSelectedElectionRouter;
