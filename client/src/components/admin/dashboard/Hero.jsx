import React, { useRef, useState } from "react";
import styled from "styled-components";

import { ReactComponent as LinkIcon } from "assets/link-icon.svg";
import { ReactComponent as CopyIcon } from "assets/copy-icon.svg";
import { Transition } from "react-transition-group";
import { Toast, toastTransitionStyles } from "pages/home.styles";
import copy from "copy-to-clipboard";

const HeroContainer = styled.section`
	padding: 0 1rem;
	margin: 3rem 0 1rem 0;

	@media screen and (max-width: 480px) {
		padding: 0 0.5rem;
	}

	.container {
		margin: 0 auto;
		padding: 1.5rem;
		background-color: #1b1c24;
		border-radius: 8pt;
		max-width: 700px;

		@media screen and (max-width: 440px) {
			padding: 0.75rem 1rem;
		}

		article {
			margin: 1rem 0;
			display: flex;
			align-items: center;
			justify-content: center;

			span,
			a {
				font-size: 16pt;
				color: #d01c8d;
				text-decoration: underline;
				cursor: pointer;
				text-align: center;
				line-height: 1.1;
				min-width: 0;
				/* flex: 1; */
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;

				@media screen and (max-width: 440px) {
					font-size: 14pt;
				}
			}
			svg {
				margin-left: 0.25rem;
				width: 24px;
				min-width: 24px;
				height: auto;
				cursor: pointer;
			}

			&:first-child {
				margin-bottom: 1.25rem;
			}
		}
		.link {
			margin: 0 auto;
			display: block;
		}
	}
`;

const Hero = ({ adminData }) => {
	const [toast, setToast] = useState({
		visible: false,
		message: "",
		type: "info", // info | error | success
		duration: 1000,
	});

	const toastTimeout = useRef(null);

	const copyUrlToClipboard = (e) => {
		handleShowToast("Copied to clipboard!", "info", 1000);
		copy(
			(window.location.hostname === "localhost"
				? "pico.snehil.dev/"
				: `${window.location.host}/`) + adminData?.slug
		);
	};

	const handleShowToast = (message, type, duration) => {
		setToast({ visible: true, message, type, duration });
	};

	return (
		<>
			<HeroContainer className="info">
				<div className="container">
					<article onClick={copyUrlToClipboard}>
						<span>
							{adminData
								? `${window.location.protocol}//${window.location.host}/${adminData.slug}`
								: ""}
						</span>
						{adminData && <CopyIcon />}
					</article>
					<LinkIcon className="link" />
					<article>
						<a href={adminData?.destination} target="_blank" rel="noreferrer">
							{adminData ? adminData.destination : ""}
						</a>
					</article>
				</div>
			</HeroContainer>
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

export default Hero;
