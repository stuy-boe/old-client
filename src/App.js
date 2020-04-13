import React from 'react';
import './App.css';

import { Content } from './comps/Content';
import AppBar from './comps/menu/AppBar';
import NavDrawer from './comps/menu/NavDrawer';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './comps/AppProvider';

import { SnackbarQueue } from '@rmwc/snackbar';
import { MessageQueue } from './comps/MessageQueue';
import '@material/snackbar/dist/mdc.snackbar.css';
import '@material/button/dist/mdc.button.css';
import { Obfuscator } from './comps/Obfuscator';
import ThemeProvider from './comps/ThemeProvider';

const App = () => {
	const [drawerOpen, setDrawerOpen] = React.useState(window.innerWidth > 800);

	const toggleDrawer = () => setDrawerOpen(!drawerOpen);

	window.onresize = event => {
		const shouldBeOpen = window.innerWidth > 800;

		if (event.isTrusted && drawerOpen !== shouldBeOpen) {
			setDrawerOpen(shouldBeOpen);
		}
	};

	return (
		<ThemeProvider>
			<div className="App">
				<BrowserRouter>
					<AppProvider>
						<AppBar toggleDrawer={toggleDrawer} />
						<NavDrawer
							drawerOpen={drawerOpen}
							toggleDrawer={toggleDrawer}
						>
							<Obfuscator
								open={drawerOpen && window.innerWidth < 800}
								toggleDrawer={toggleDrawer}
							/>
							<Content />
						</NavDrawer>
					</AppProvider>
				</BrowserRouter>

				<SnackbarQueue messages={MessageQueue.messages} />
			</div>
		</ThemeProvider>
	);
};

export default App;
