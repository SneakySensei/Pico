import styled from "styled-components";

import { CreateLinkInput } from "components/home";

import { ReactComponent as PicoLogo } from "assets/pico-logo.svg";

const HomeContainer = styled.main`
	position: relative;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1.5rem;

	.logo {
		position: absolute;
		inset: 1rem auto auto 1rem;
		height: 40px;
		width: auto;
	}
`;

const Home = () => {
	return (
		<HomeContainer>
			<PicoLogo className="logo" />
			<CreateLinkInput />
		</HomeContainer>
	);
};

export default Home;
