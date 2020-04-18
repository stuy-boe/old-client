import React from 'react';
import {
	Drawer,
	DrawerAppContent,
	DrawerContent,
	DrawerHeader,
	DrawerSubtitle,
	DrawerTitle
} from '@rmwc/drawer';
import '@material/drawer/dist/mdc.drawer.css';

import { CollapsibleList, List, SimpleListItem } from '@rmwc/list';

import '@material/list/dist/mdc.list.css';
import '@rmwc/list/collapsible-list.css';
import { AppContext } from '../AppProvider';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { splitPath } from '../../utils/splitPath';
import MenuItem from './MenuItem';
import backend from '../../utils/backend';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	NavDrawer: {
		borderRight: 0,
		position: 'fixed'
	},
	DrawerAppContent: {
		padding: '1rem'
	},
	DrawerLogo: {
		paddingTop: '1em',
		width: '100px'
	}
});

const NavDrawer = props => {
	const classes = useStyles();

	const context = React.useContext(AppContext);

	const location = useLocation();

	const getModifiedPath = (index, val) => {
		let newPath = splitPath(location.pathname);
		newPath[index] = val;
		return '/' + newPath.join('/');
	};

	const attemptLogout = () => {
		backend.get('/api/auth/logout').then(() => {
			context.updateState();
		});
	};

	let electionIsSelected = useRouteMatch('/elections/:id');

	return (
		<div>
			<Drawer
				dismissible
				open={props.drawerOpen}
				className={classes.NavDrawer}
			>
				<DrawerHeader>
					<img
						src={'/logo100.png'}
						alt={'StuyBOE Logo'}
						className={classes.DrawerLogo}
					/>
					<DrawerTitle>
						{context.signedIn ? context.user.name : 'Not Signed In'}
					</DrawerTitle>
					<DrawerSubtitle>
						{context.signedIn ? context.user.email : ''}
					</DrawerSubtitle>
				</DrawerHeader>

				<DrawerContent className={['DrawerContent']}>
					<List
						onClick={() => {
							// If we're on mobile
							// close the drawer upon the click of a list item
							if (window.innerWidth < 600) {
								props.toggleDrawer(false);
							}
						}}
					>
						{context.signedIn && (
							<SimpleListItem
								graphic="power_settings_new"
								text="Sign Out"
								onClick={attemptLogout}
							/>
						)}

						{context.signedIn && context.admin.status && (
							<MenuItem
								to={'/admin'}
								text={'Admin'}
								icon={'build'}
								activeRoute={'/admin'}
							/>
						)}

						{context.signedIn && context.campaignManager.status && (
							<MenuItem
								to={'/campaign'}
								text={'Campaign'}
								icon={'assignment_ind'}
								activeRoute={'/campaign'}
							/>
						)}

						<MenuItem
							to={'/'}
							text={'Your Feed'}
							icon={'home'}
							activeRoute={'/'}
							exactRoute
						/>

						<CollapsibleList
							handle={
								<MenuItem
									to={'/elections'}
									text={'Elections'}
									icon={'how_to_vote'}
									activeRoute={'/elections'}
									metaIcon={'chevron_right'}
									exactRoute
								/>
							}
							open={electionIsSelected}
						>
							<MenuItem
								to={getModifiedPath(2, '')}
								text={'Overview'}
								icon={'dashboard'}
								activeRoute={'/elections/:id'}
								exactRoute
							/>

							<MenuItem
								to={getModifiedPath(2, 'candidates')}
								text={'Candidates'}
								icon={'people'}
								activeRoute={'/elections/:id/candidates'}
							/>

							<MenuItem
								to={getModifiedPath(2, 'vote')}
								text={'Vote'}
								icon={'where_to_vote'}
								activeRoute={'/elections/:id/vote'}
							/>

							<MenuItem
								to={getModifiedPath(2, 'results')}
								text={'Results'}
								icon={'ballot'}
								activeRoute={'/elections/:id/results'}
								fillParams
							/>
						</CollapsibleList>

						<MenuItem
							to={'/contact'}
							text={'Contact Us'}
							icon={'chat_bubble'}
							activeRoute={'/contact'}
						/>

						<MenuItem
							to={'/help'}
							text={'Help'}
							icon={'help'}
							activeRoute={'/help'}
						/>
					</List>
				</DrawerContent>
			</Drawer>

			<DrawerAppContent className={classes.DrawerAppContent}>
				{props.children}
			</DrawerAppContent>
		</div>
	);
};

export default NavDrawer;
