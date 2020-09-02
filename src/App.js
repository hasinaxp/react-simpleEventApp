import React from 'react';
import './App.css';
import {
	BrowserRouter,
	Switch,
	Route, Link
} from 'react-router-dom'

import CreateEvent from './components/CreateEvent'
import ListEvents from './components/ListEvents'
import RegisterEvents from './components/RegisterEvent'
function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						<ListEvents />
					</Route>
					<Route path="/create">
						<CreateEvent />
					</Route>
					<Route path="/register/:id">
						 <RegisterEvents />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
