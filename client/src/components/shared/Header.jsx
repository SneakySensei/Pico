import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";

import { ReactComponent as PicoLogo } from "assets/pico-logo.svg";
import { ReactComponent as LoginIcon } from "assets/login-icon.svg";

const HeaderContainer = styled.header`
	padding: 1.5rem;
	nav {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		.logo {
			margin-right: auto;
			svg {
				height: 32px;
				width: auto;

				@media screen and (max-width: 480px) {
					height: 28px;
				}
			}
		}

		.nav-item {
			font-size: 16pt;
			color: #efefef;
			text-decoration: none;
			position: relative;
			display: flex;
			align-items: center;

			svg {
				width: 28px;
				height: auto;
				margin-left: 0.5rem;
				transition: all 200ms ease;
			}

			&:hover svg {
				transform: rotate(90deg);
			}
		}
	}
`;

const Header = () => {
	const match = useRouteMatch();
	const authData = JSON.parse(sessionStorage.getItem("authData"));
	return (
		<HeaderContainer>
			<nav>
				<Link className="logo" to="/">
					<PicoLogo />
				</Link>
				{match?.path !== "/admin/:slug?" && (
					<Link
						className="nav-item"
						to={authData ? `/admin/${authData.slug}` : "/admin"}
					>
						{authData ? "Manage" : "Login"} <LoginIcon />
					</Link>
				)}
			</nav>
		</HeaderContainer>
	);
};

export default Header;
