import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as CopyIcon } from "assets/copy-icon.svg";
import { ReactComponent as EyeIcon } from "assets/eye-icon.svg";

const InputContainer = styled.div`
	align-self: center;
	margin-top: 2rem;
	background-color: #1b1c24;
	width: 400px;
	position: relative;
	border-radius: 4pt;
	transition: all 200ms ease;

	@media screen and (max-width: 560px) {
		width: 320px;
	}

	@media screen and (max-width: 420px) {
		/* width: 240px; */
		width: 100%;
	}

	&::before {
		content: "";
		z-index: 5;
		pointer-events: none;
		position: absolute;
		inset: 0;
		border-radius: 4pt;
		padding: 2px;
		background: linear-gradient(30deg, #cc208e, #6713d2);
		-webkit-mask: linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: destination-out;
		mask-composite: exclude;
		opacity: 1;
		transition: all 600ms cubic-bezier(0.07, 0.71, 0.07, 0.71);

		@media screen and (max-width: 480px) {
			padding: 1px;
		}
	}

	input {
		all: unset;
		width: 100%;
		font-size: 14pt;
		padding: 0.75rem 1.25rem;

		&::placeholder {
			color: #37394a;
		}

		/* @media screen and (max-width: 420px) {
			font-size: 12pt;
			padding: 0.5rem 1rem;
		} */
	}
	.peek-btn {
		cursor: pointer;
		position: absolute;
		right: 48px;
		top: 0;
		bottom: 0;
		padding: 0;
		background: linear-gradient(to right, #1b1c2400 0%, #1b1c24 25%);
		outline: none;
		border: none;
		transition: transform 200ms ease;

		/* @media screen and (max-width: 420px) {
			right: 42px;
		} */

		svg {
			height: 100%;
			width: 40px;
			padding: 0.5rem;

			/* @media screen and (max-width: 420px) {
				width: 32px;
			} */

			.close {
				opacity: 1;
			}
			.open {
				opacity: 0;
			}
			.slash {
				stroke-dasharray: 50;
				stroke-dashoffset: 0;
				transition: all 400ms ease;
			}

			&.peek {
				.close {
					opacity: 0;
					transition: opacity 0ms 200ms;
				}
				.open {
					opacity: 1;
					transition: opacity 0ms 200ms;
				}
				.slash {
					stroke-dashoffset: 50;
				}
			}
		}

		&:active {
			transform: scale(0.8);
		}
	}
	.copy-btn {
		cursor: pointer;
		position: absolute;
		right: 4px;
		top: 0;
		bottom: 0;
		height: 100%;
		width: 40px;
		margin-right: 0.25rem;
		padding: 0.5rem;
		background: #1b1c24;
		transition: transform 200ms ease;

		/* @media screen and (max-width: 420px) {
			width: 32px;
		} */

		&:active {
			transform: scale(0.8);
		}
	}
`;

const PasswordView = ({ password, showToast }) => {
	const [visible, setVisible] = useState(false);

	const copyUrlToClipboard = (e) => {
		showToast("Copied to clipboard!", "info", 1000);
		// inputRef.current.select();
		// inputRef.current.setSelectionRange(0, 99999);
		// document.execCommand("copy");
		navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
			if (result.state === "granted" || result.state === "prompt") {
				navigator.clipboard.writeText(password).then(
					function () {
						/* clipboard successfully set */
					},
					function () {
						/* clipboard write failed */
					}
				);
			}
		});
	};

	return (
		<InputContainer>
			<input
				disabled={true}
				value={password}
				type={visible ? "text" : "password"}
			/>
			<button
				onMouseDown={() => {
					setVisible(!visible);
				}}
				className="peek-btn"
			>
				<EyeIcon className={visible ? "peek" : ""} />
			</button>
			<CopyIcon className="copy-btn" onClick={copyUrlToClipboard} />
		</InputContainer>
	);
};

export default PasswordView;
