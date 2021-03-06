import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ErrorPage from "./pages/404";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HowToUse from "components/shared/HowToUse";

const GlobalStyles = createGlobalStyle`
	*, ::before, ::after {
		box-sizing: border-box !important;
		font-family: "Nunito Sans", sans-serif;
	}
	
  body {
    margin: 0;
    color: #EFEFEF;
		background-color: #121013;

		&.modal-open{
			overflow: hidden;
		}
		
	}

	::-webkit-scrollbar {
			width: 2px;
	}

	::-webkit-scrollbar *{
		background: transparent;
	}
	
	::-webkit-scrollbar-thumb {
		all: unset;
		background-color: #efefef;
		transition: all 200ms ease;

		&:hover{
			background-color: #CC208E;
		}
	}

	.Toastify__toast--dark{
		background-color: #1B1C24 !important;
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
					<Route exact path="/admin/:slug?">
						<Admin />
					</Route>
					<Route>
						<ErrorPage />
					</Route>
				</Switch>
			</Router>
			<HowToUse />
			<ToastContainer />
		</>
	);
}

export default App;
