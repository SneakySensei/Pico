import React from "react";
import styled from "styled-components";
import { ReactComponent as PicoLogo } from "assets/pico-logo.svg";

const HeaderContainer = styled.header`
	padding: 1.5rem;
	nav {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		.logo {
			height: 40px;
			width: auto;
			margin-right: auto;
		}

		div {
			font-size: 16pt;
		}
	}
`;

const Header = () => {
	return (
		<HeaderContainer>
			<nav>
				<PicoLogo className="logo" />
				<div>Admin</div>
			</nav>
		</HeaderContainer>
	);
};

export default Header;
