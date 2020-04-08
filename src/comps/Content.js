import React from "react";
import {AuthButton} from "./AuthButton";
import {AppContext} from "./AppProvider";
import {Switch, Route, useLocation} from "react-router-dom";
import {Elections} from "./../pages/Elections";
import {Helmet} from "react-helmet";

export const Content = (props) => {
	const context = React.useContext(AppContext);
	const location = useLocation();

	return (
		<div>
			{/*(Mostly) Constant Open Graph Properties*/}
			<Helmet>
				<meta property="og:url" content={process.env.PUBLIC_URL + location.pathname}/>
				<meta property="og:site_name" content={"Stuyvesant Board of Elections Voting Site"}/>
				<meta property="og:type" content={"website"}/>
				<meta property="og:image" content={process.env.PUBLIC_URL + "/logo512.png"}/>
				<title>Stuy BOE Voting Site</title>
			</Helmet>

			<Switch>
				<Route path={"/"} component={Hello} exact/>
				<Route path={"/elections"} component={Elections}/>
			</Switch>

			{
				! context.signedIn &&
				<AuthButton/>
			}
		</div>
	)
};

function Hello() {
	return (
		<div>
			<Helmet>
				<title>{"Home | Stuy BOE Voting Site"}</title>
				<meta property="og:title" content={"Home | Stuy BOE Voting Site"}/>
				<meta property="og:description" content={"This is where voting as well as campaigning for Student Union Elections takes place"}/>
			</Helmet>
			<h1>Hello World!</h1>
		</div>
	);
}
