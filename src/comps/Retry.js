// @flow
import React from 'react';

import type { Node } from 'react';

import { Button } from '@rmwc/button';
import '@material/button/dist/mdc.button.css';
import Title from '../typography/Title';
import FlexCenter from './FlexCenter';

type Props = {
	onRetry: Function,
	message: string | Node,
	fullHeight: boolean
};

const Retry = (props: Props) => {
	return (
		<FlexCenter fullHeight={props.fullHeight}>
			<div>
				{typeof props.message === 'string' ? (
					// If the message is a string, enclose it in a heading
					<Title level={2} center>
						{props.message}
					</Title>
				) : (
					// Otherwise it is a component and we should render as-is
					props.message
				)}

				<FlexCenter>
					<Button outlined onClick={props.onRetry}>
						Retry
					</Button>
				</FlexCenter>
			</div>
		</FlexCenter>
	);
};

Retry.defaultProps = {
	fullHeight: true
};

export default Retry;
