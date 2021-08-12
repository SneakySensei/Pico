import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    color: #FFFFFF;
    font-family: sans-serif;
		background-color: #121013;
  }
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<Router>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/admin/:slug">
						<Admin />
					</Route>
					<Route>404</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
