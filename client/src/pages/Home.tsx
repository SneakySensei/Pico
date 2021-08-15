import { useState } from "react";
import styled from "styled-components";

import { CreateLinkInput } from "components/home";
import { Header, OutlineButton } from "components/shared";

import { urlRegEx } from "utils";

import { ReactComponent as LinkGlyph } from "assets/link-glyph.svg";

const HomeContainer = styled.main`
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	main {
		flex: 1;
		padding: 0 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.link-bg {
		position: fixed;
		bottom: 0;
		right: 0;
		width: 90%;
		max-width: 400px;
		height: auto;
		z-index: -10;
	}
`;

const Home = () => {
	const [urlInput, setUrlInput] = useState<{ value: string; valid: boolean }>({
		value: "",
		valid: false,
	});

	console.log(urlInput);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUrlInput({
			value: e.target.value,
			valid: urlRegEx.test(e.target.value),
		});
	};

	const handleShrink = (e: React.MouseEvent<HTMLButtonElement>) => {
		console.log(urlInput.value);
	};

	return (
		<HomeContainer>
			<Header />
			<main>
				<CreateLinkInput url={urlInput.value} onChange={handleInputChange} />
				<OutlineButton
					disabled={!urlInput.valid}
					theme="primary"
					style={{ marginTop: "2rem" }}
					onClick={handleShrink}
				>
					Shrink
				</OutlineButton>
			</main>
			<LinkGlyph className="link-bg" />
		</HomeContainer>
	);
};

export default Home;
