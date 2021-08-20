import { useRef, useState } from "react";
import axios from "axios";
import Transition from "react-transition-group/Transition";
import { Prompt } from "react-router-dom";

import {
	GradientTextButton,
	HomeContainer,
	Toast,
	toastTransitionStyles,
} from "./home.styles";

import { CreateLinkInput, PasswordView } from "components/home";
import { Header, HorizontalLoader, OutlineButton } from "components/shared";

import { urlRegEx } from "services/utils";

import { ReactComponent as LinkGlyph } from "assets/link-glyph.svg";

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

				// confirm tab close/reload
				window.addEventListener("beforeunload", function (e) {
					var confirmationMessage = "";

					(e || window.event).returnValue = confirmationMessage; //Gecko + IE
					return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
				});
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
			<Prompt
				when={shortUrl.loading || shortUrl.data !== null}
				message={`You're about to leave this page. Make sure you've noted your picolink${
					shortUrl.loadingAdministration ||
					shortUrl.data?.administration === true
						? " and admin password."
						: "."
				}`}
			/>
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
								theme="primary"
								onClick={handleShrink}
							>
								{shortUrl.loading ? <HorizontalLoader /> : "Shrink"}
							</OutlineButton>
						) : (
							<>
								<GradientTextButton
									className="admin-btn"
									onClick={handleEnableAdministration}
									disabled={
										shortUrl.loadingAdministration ||
										shortUrl.data.administration
									}
								>
									{shortUrl.data.administration
										? "Administration Enabled!"
										: shortUrl.loadingAdministration
										? "Enabling Administration..."
										: "Enable Administration"}
								</GradientTextButton>
								{shortUrl.data.administration && (
									<>
										<PasswordView
											password={shortUrl.data.password}
											showToast={handleShowToast}
										/>
										<div className="password-msg">
											This is your admin password. Make sure you note this down.
											<br /> My creator didn't write a password recovery flow.
											🙂
										</div>
									</>
								)}
							</>
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
