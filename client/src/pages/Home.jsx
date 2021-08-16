import { useState } from "react";
import styled from "styled-components";

import { CreateLinkInput } from "components/home";
import { Header, OutlineButton } from "components/shared";

import { urlRegEx } from "services/utils";
import { createShortLink } from "services/apiService";
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
	const [urlInput, setUrlInput] = useState({
		value: "",
		valid: false,
	});
	const [shortUrl, setShortUrl] = useState({ loading: false, data: null });

	console.log(shortUrl);

	const handleInputChange = (e) => {
		setUrlInput({
			value: e.target.value,
			valid: urlRegEx.test(e.target.value),
		});
	};

	const handleShrink = async (e) => {
		setShortUrl((shortUrl) => ({ ...shortUrl, loading: true }));
		const res = await createShortLink(urlInput.value);
		console.log(res);
		if (res) {
			setShortUrl((shortUrl) => ({ loading: false, data: res }));
		}
		console.log(res);
	};

	return (
		<HomeContainer>
			<Header />
			<main>
				<CreateLinkInput
					url={urlInput.value}
					disabled={shortUrl.data !== null}
					onChange={handleInputChange}
					onSubmit={handleShrink}
				/>
				<OutlineButton
					disabled={!urlInput.valid}
					// loading={}
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
