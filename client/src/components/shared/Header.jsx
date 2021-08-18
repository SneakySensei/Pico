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
				height: 40px;
				width: auto;
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
				width: 24px;
				height: auto;
				color: #eee;
				margin-left: 0.5rem;
			}

			&::after {
				content: "";
				display: block;
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				height: 2px;
				background-color: #efefef;
				transform: scaleX(0);
				opacity: 0;
				transition: all 200ms ease;
			}

			&:hover::after {
				transform: scaleX(1);
				opacity: 1;
			}
		}
	}
`;

const Header = () => {
	const match = useRouteMatch();
	return (
		<HeaderContainer>
			<nav>
				<Link className="logo" to="/">
					<PicoLogo />
				</Link>
				{match?.path !== "/admin/:slug?" && (
					<Link className="nav-item" to="/admin">
						Login <LoginIcon />
					</Link>
				)}
			</nav>
		</HeaderContainer>
	);
};

export default Header;
