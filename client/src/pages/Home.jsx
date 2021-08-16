import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { CreateLinkInput } from "components/home";
import { Header, HorizontalLoader, OutlineButton } from "components/shared";

import { urlRegEx } from "services/utils";

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

	.controls {
		display: flex;
		margin-top: 2rem;

		.admin-btn {
			border: none;
			outline: none;
			position: relative;
			font-size: 18pt;
			font-weight: bold;
			color: #efefef;
			background: linear-gradient(to right, #cc208e, #6713d2);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			cursor: pointer;
			&::before {
				content: "";
				display: block;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 2px;
				background: linear-gradient(to right, #cc208e, #6713d2);
				transform: scaleX(0);
				opacity: 0;
				transition: transform 200ms ease, opacity 200ms ease;
			}
			&:hover::before {
				transform: scaleX(1);
				opacity: 1;
			}
		}
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

	const handleShrink = (e) => {
		setShortUrl((shortUrl) => ({ ...shortUrl, loading: true }));
		axios
			.post("/api/shrinkurl", { url: urlInput.value })
			// new Promise((resolve) =>
			// 	setTimeout(
			// 		() =>
			// 			resolve({
			// 				data: {
			// 					slug: "testingurl",
			// 					_id: "sadasdasgasdguiosdghwuidghwuisdghuiweui",
			// 				},
			// 			}),
			// 		3000
			// 	)
			// )
			.then((res) => {
				setShortUrl((shortUrl) => ({ loading: false, data: res.data }));
			})
			.catch((err) => {
				console.log(err);
				setShortUrl((shortUrl) => ({ ...shortUrl, loading: false }));
			});
	};

	const handleEnableAdministration = (e) => {
		console.log(shortUrl.data.slug, shortUrl.data._id);
	};

	return (
		<HomeContainer>
			<Header />
			<main>
				<CreateLinkInput
					valule={urlInput.value}
					loading={shortUrl.loading}
					shortUrl={shortUrl.data}
					onChange={handleInputChange}
					onSubmit={handleShrink}
				/>
				<section className="controls">
					{shortUrl.loading ? (
						<HorizontalLoader style={{ marginTop: "2rem" }} />
					) : shortUrl.data === null ? (
						<OutlineButton
							disabled={!urlInput.valid}
							loading={true}
							theme="primary"
							style={{ marginTop: "2rem" }}
							onClick={handleShrink}
						>
							Shrink
						</OutlineButton>
					) : (
						<button className="admin-btn" onClick={handleEnableAdministration}>
							Enable Administration
						</button>
					)}
				</section>
			</main>
			<LinkGlyph className="link-bg" />
		</HomeContainer>
	);
};

export default Home;
