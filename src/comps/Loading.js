import React from "react";

import {CircularProgress} from "@rmwc/circular-progress";
import '@rmwc/circular-progress/circular-progress.css';

import {Theme} from "@rmwc/theme";

const Loading : React.Component = () => {
	return (
		<div
			className={["flex-center"]}
			style={{
				paddingTop: "calc(50vh - 72px)"
			}}
		>
			{/*	Loading Screen */}
			<Theme use={"onPrimary"} >
				<CircularProgress size={72} />
			</Theme>
		</div>
	);
};

export default Loading;
