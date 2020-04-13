import React from 'react';

import { SimpleTopAppBar, TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import '@material/top-app-bar/dist/mdc.top-app-bar.css';
import '@material/icon-button/dist/mdc.icon-button.css';

import '@rmwc/icon/icon.css';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	AppBar: {
		backgroundColor: 'white',
		color: 'black',
		zIndex: 99
	},
	Title: {
		fontFamily: `'Sumana', serif`
	}
});

const AppBar = props => {
	const classes = useStyles();

	return (
		<div>
			<SimpleTopAppBar
				title={
					<span className={classes.Title}>Board of Elections</span>
				}
				navigationIcon={true}
				onNav={props.toggleDrawer}
				className={classes.AppBar}
				fixed
			/>
			<TopAppBarFixedAdjust />
		</div>
	);
};

export default AppBar;
