import React from 'react';
import { Theme } from '@rmwc/theme';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	Subtitle: {
		fontSize: '0.8rem'
	}
});

type Props = {
	children: string,
	center: boolean,
	style: Object,
	className: Array | string,
	theme: string
};

const Subtitle = (props: Props) => {
	const defaultClasses = useStyles();
	const subtitleClasses = defaultClasses.Subtitle.split(' ');

	const styles = props.style;

	let classesArray = props.className;

	if (typeof classesArray === 'string') {
		classesArray = props.className.split(' ');
	}

	const classes = [...subtitleClasses, ...classesArray];

	if (props.center) {
		classes.push('text-center');
	}

	const classesString = classes.filter(Boolean).join(' ');

	return (
		<Theme use={props.theme}>
			<span style={styles} className={classesString}>
				{props.children}
			</span>
		</Theme>
	);
};

Subtitle.defaultProps = {
	children: '',
	center: false,
	style: {},
	className: [],
	theme: 'textHintOnBackground'
};

export default Subtitle;
