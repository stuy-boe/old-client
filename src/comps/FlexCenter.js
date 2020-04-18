// @flow
import React from 'react';
import type { Node } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	FlexCenter: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: props => (props.fullHeight ? '100%' : 'unset')
	}
});

type PropTypes = {
	children: Node,
	fullHeight: boolean
};

const FlexCenter = (props: PropTypes) => {
	const fullHeight = Boolean(props.fullHeight);
	const classes = useStyles({ fullHeight });

	return <div className={classes.FlexCenter}>{props.children}</div>;
};

FlexCenter.defaultProps = {
	children: <></>,
	fullHeight: false
};

export default FlexCenter;
