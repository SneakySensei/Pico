import { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Transition from "react-transition-group/Transition";

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
		/* display: flex; */
		margin-top: 2rem;
		height: 100px;
	}
`;

const GradientTextButton = styled.button`
	border: none;
	outline: none;
	position: relative;
	font-size: 18pt;
	font-weight: bold;
	color: #efefef;
	background: linear-gradient(to right, #cc208e, #6713d2, #cc208e, #6713d2);
	background-size: 300% 100%;
	background-position-x: right;

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
`;

const Toast = styled.article`
	position: fixed;
	z-index: 50;
	left: 50%;
	bottom: 4rem;
	background: #44444488;
	color: #efefef;
	font-size: 12pt;
	padding: 0.5rem 1rem;
	border-radius: 2pt;
	pointer-events: none;
	transition: opacity 200ms linear, transform 100ms linear;
`;

const toastTransitionStyles = {
	entering: { opacity: 1, transform: "translate(-50%, 0rem)" },
	entered: { opacity: 1, transform: "translate(-50%, 0rem)" },
	exiting: { opacity: 0, transform: "translate(-50%, 0rem)" },
	exited: { opacity: 0, transform: "translate(-50%, 3rem)" },
};

const Home = () => {
	const [urlInput, setUrlInput] = useState({
		value: "",
		valid: false,
	});
	const [shortUrl, setShortUrl] = useState({
		loading: false,
		loadingAdministration: false,
		data: null,
	});

	const [toast, setToast] = useState({
		visible: false,
		message: "",
		type: "info", // info | error | success
		duration: 1000,
	});

	const toastTimeout = useRef(null);

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
				setShortUrl((shortUrl) => ({
					...shortUrl,
					loading: false,
					data: res.data,
				}));
			})
			.catch((err) => {
				console.log(err);
				setShortUrl((shortUrl) => ({
					...shortUrl,
					shortUrl: null,
					loading: false,
				}));
			});
	};

	const handleEnableAdministration = (e) => {
		setShortUrl((shortUrl) => ({ ...shortUrl, loadingAdministration: true }));
		axios
			.put("/api/enableanalytics", { linkId: shortUrl.data._id })
			.then((res) => {
				console.log(res.data);
				setShortUrl((shortUrl) => ({
					...shortUrl,
					loadingAdministration: false,
					data: res.data,
				}));
			})
			.catch((err) => {
				console.log(err);
				setShortUrl((shortUrl) => ({
					...shortUrl,
					loadingAdministration: false,
				}));
			});
	};

	const handleShowToast = (message, type, duration) => {
		setToast({ visible: true, message, type, duration });
	};

	return (
		<>
			<HomeContainer>
				<Header />
				<main>
					<CreateLinkInput
						valule={urlInput.value}
						loading={shortUrl.loading}
						shortUrl={shortUrl.data}
						onChange={handleInputChange}
						onSubmit={handleShrink}
						showToast={handleShowToast}
					/>
					<section className="controls">
						{shortUrl.data === null ? (
							<OutlineButton
								disabled={!urlInput.valid}
								loading={true}
								theme="primary"
								onClick={handleShrink}
							>
								{shortUrl.loading ? <HorizontalLoader /> : "Shrink"}
							</OutlineButton>
						) : (
							<GradientTextButton
								className="admin-btn"
								onClick={handleEnableAdministration}
							>
								Enable Administration
							</GradientTextButton>
						)}
					</section>
				</main>
				<LinkGlyph className="link-bg" />
			</HomeContainer>
			<Transition
				in={toast.visible}
				timeout={200}
				onEntered={() => {
					toastTimeout.current = setTimeout(
						() =>
							setToast((toast) => ({
								...toast,
								visible: false,
							})),
						toast.duration
					);
				}}
			>
				{(state) => (
					<Toast type={toast.type} style={{ ...toastTransitionStyles[state] }}>
						{toast.message}
					</Toast>
				)}
			</Transition>
		</>
	);
};

export default Home;
