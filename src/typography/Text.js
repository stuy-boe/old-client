import React from 'react';
import { Theme } from '@rmwc/theme';

type Props = {
	children: string,
	center: boolean,
	style: Object,
	className: Array | string,
	theme: string
};

const Text = (props: Props) => {
	const styles = props.style;

	let classesArray = props.className;

	if (typeof classesArray === 'string') {
		classesArray = props.className.split(' ');
	}

	const classes = classesArray;

	if (props.center) {
		classes.push('text-center');
	}

	const classesString = classes.filter(Boolean).join(' ');

	return (
		<Theme use={props.theme}>
			<p style={styles} className={classesString}>
				{props.children}
			</p>
		</Theme>
	);
};

Text.defaultProps = {
	children: '',
	center: false,
	style: {},
	className: [],
	theme: 'textPrimaryOnBackground'
};

export default Text;
