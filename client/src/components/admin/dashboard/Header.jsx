import React from "react";
import styled from "styled-components";

import { ReactComponent as PicoLogo } from "assets/pico-logo.svg";
import { ReactComponent as LogoutIcon } from "assets/logout-icon.svg";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
const HeaderContainer = styled.header`
	padding: 1rem;

	@media screen and (max-width: 480px) {
		padding: 0.5rem;
	}

	nav {
		background-color: #121013;
		border-radius: 8pt;
		padding: 1rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;

		@media screen and (max-width: 480px) {
			padding: 0.75rem 1.25rem;
		}

		a {
			height: 32px;
			@media screen and (max-width: 480px) {
				height: 28px;
			}
		}

		svg {
			height: 100%;
			width: auto;
		}

		.logout-btn {
			all: unset;
			display: flex;
			align-items: center;
			font-size: 16pt;
			cursor: pointer;

			@media screen and (max-width: 480px) {
				font-size: 14pt;
			}

			svg {
				margin-left: 0.5rem;
				height: 28px;
				width: auto;

				@media screen and (max-width: 480px) {
					height: 24px;
				}
			}
		}
	}
`;
const Header = () => {
	const history = useHistory();

	return (
		<HeaderContainer>
			<nav>
				<Link to="/">
					<PicoLogo />
				</Link>
				<button
					className="logout-btn"
					onClick={() => {
						sessionStorage.removeItem("authData");
						history.replace("/");
					}}
				>
					Logout <LogoutIcon />
				</button>
			</nav>
		</HeaderContainer>
	);
};

export default Header;
