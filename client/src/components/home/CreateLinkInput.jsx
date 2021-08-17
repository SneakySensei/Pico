import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { ReactComponent as CopyIcon } from "assets/copy-icon.svg";

const InputContainer = styled.div`
	background-color: #1b1c25;
	width: 100%;
	max-width: 960px;
	position: relative;
	border-radius: 4pt;
	transition: all 200ms ease;

	&::before {
		content: "";
		z-index: 5;
		pointer-events: none;
		position: absolute;
		inset: 0;
		border-radius: 4pt;
		padding: 2px;
		background: linear-gradient(30deg, #6713d2, #cc208e, #6713d2);
		background-size: 200% 100%;
		background-position: left;
		-webkit-mask: linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: destination-out;
		mask-composite: exclude;
		opacity: 1;
		transition: all 600ms cubic-bezier(0.07, 0.71, 0.07, 0.71);
	}

	&:focus-within {
		box-shadow: rgba(0, 0, 0, 1) 0px 3px 8px;
		&::before {
			opacity: 1;
			background-position: right;
		}
	}

	input {
		all: unset;
		width: 100%;
		font-size: 24px;
		padding: 0.75rem 1rem;

		&::placeholder {
			color: #37394a;
		}
	}

	.copy-btn {
		cursor: pointer;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		height: 100%;
		width: 48px;
		padding: 0.6rem;
		background: linear-gradient(to right, #1b1c2400 0%, #1b1c24 25%);
		opacity: ${(props) => (props.isShrunk ? 1 : 0)};
		transition: opacity 200ms 1200ms ease, transform 200ms ease;

		&:active {
			transform: scale(0.8);
		}
	}
`;

const Toast = styled.article`
	position: fixed;
	left: 50%;
	transform: translateX(-50%);
	bottom: 4rem;
	background: #44444488;
	color: #efefef;
	font-size: 14pt;
	padding: 0.5rem 1rem;
	border-radius: 999px;
	pointer-events: none;
`;

const dict = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const CreateLinkInput = ({ url, onChange, onSubmit, shortUrl, loading }) => {
	const interval = useRef(null);
	const inputRef = useRef(null);

	// NOTE COOL HACKER ANIMATION 🔥🔥🔥
	useEffect(() => {
		if (!loading) {
			clearInterval(interval.current);

			// If data has arrived, begin stopping the hacker animation gracefully
			if (shortUrl !== null) {
				let count = 0;

				// which char position to stop next
				let nextToShow = Array.from(Array(shortUrl.slug.length), (_, i) => i);
				nextToShow.sort(() => Math.random() - 0.5);

				// all chars that have stopped
				let charsVisible = [];

				interval.current = setInterval(() => {
					let crypticSlug =
						(window.location.hostname === "localhost"
							? "pico.snehil.dev"
							: window.location.hostname) + "/";

					if (count % 1 === 0) {
						charsVisible.push(nextToShow.shift());
					}

					for (let i = 0; i < shortUrl.slug.length; i++) {
						if (charsVisible.includes(i)) {
							crypticSlug += shortUrl.slug[i];
						} else {
							crypticSlug += dict[Math.floor(Math.random() * dict.length)];
						}
					}

					inputRef.current.value = crypticSlug;

					count += 0.5; // Controls speed of stopping.
					if (count === shortUrl.slug.length) {
						clearInterval(interval.current);
					}
				}, 70);
			}
		} else {
			// Animation starts
			interval.current = setInterval(() => {
				let crypticSlug =
					(window.location.hostname === "localhost"
						? "pico.snehil.dev"
						: window.location.hostname) + "/";
				for (let i = 0; i < 10; i++) {
					crypticSlug += dict[Math.floor(Math.random() * dict.length)];
				}
				inputRef.current.value = crypticSlug;
			}, 70);
		}

		// return ()=>{clearInterval(interval.current)}
	}, [loading]);

	const copyUrlToClipboard = (e) => {
		// inputRef.current.select();
		// inputRef.current.setSelectionRange(0, 99999);
		// document.execCommand("copy");
		navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
			if (result.state === "granted" || result.state === "prompt") {
				navigator.clipboard
					.writeText(
						(window.location.hostname === "localhost"
							? "pico.snehil.dev"
							: window.location.hostname) +
							"/" +
							shortUrl.slug
					)
					.then(
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
		<>
			<InputContainer isShrunk={shortUrl !== null}>
				<input
					ref={inputRef}
					disabled={shortUrl !== null}
					value={url}
					onChange={onChange}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							onSubmit();
						}
					}}
					placeholder="https://"
				/>
				<CopyIcon className="copy-btn" onClick={copyUrlToClipboard} />
			</InputContainer>
			{/* <Toast>Copied to Clipboard!</Toast> */}
		</>
	);
};

export default CreateLinkInput;