// @flow
import React from 'react';
import { Theme } from '@rmwc/theme';
import { createUseStyles } from 'react-jss';
import clampNumber from '../utils/clampNumber';

const useStyles = createUseStyles({
	Title: {
		fontSize: props => `${3.4 - props.level * 0.4}rem`
	}
});

type Props = {
	children: string,
	center: boolean,
	style: Object,
	className: string | Array,
	level: number,
	theme: string
};

const Title = (props: Props) => {
	const styles = props.style;

	const level = clampNumber(props.level, 1, 6) || 1;

	let classesArray = props.className;

	if (typeof classesArray === 'string') {
		classesArray = props.className.split(' ');
	}

	const defaultClasses = useStyles({ level });

	const titleClasses = defaultClasses.Title.split(' ');

	let classes = [...titleClasses, ...classesArray];

	if (props.center) {
		classes.push('text-center');
	}

	const classesString = classes.filter(Boolean).join(' ');

	return (
		<Theme use={props.theme}>
			<h1 style={styles} className={classesString}>
				{props.children}
			</h1>
		</Theme>
	);
};

Title.defaultProps = {
	children: '',
	center: false,
	style: {},
	className: '',
	level: 1,
	theme: 'textPrimaryOnBackground'
};

export default Title;
