import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Header, HorizontalLoader, OutlineButton } from "components/shared";

import { ReactComponent as EyeIcon } from "assets/eye-icon.svg";
import { slugRegEx } from "services/utils";

const LoginContainer = styled.main`
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	.content {
		flex: 1;
		padding: 0 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-bottom: 94px;

		.title {
			font-size: 22pt;
			font-weight: bold;
			color: #efefef;
			/* background: linear-gradient(to right, #cc208e, #6713d2);

			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent; */
			margin-bottom: 2rem;
		}

		label {
			width: 100%;
			max-width: 700px;
			display: flex;
			flex-direction: column;
			font-size: 16pt;

			&:nth-child(3) {
				margin-bottom: 2rem;
			}
			&:not(:first-child) {
				margin-top: 1rem;
			}

			.error {
				font-size: 12pt;
				color: #f44336;
				margin-top: 0.25rem;
			}
		}

		.url-input {
			margin-top: 0.5rem;
			border-radius: 4pt;
			display: flex;
			align-items: center;
			background-color: #1b1c24;
			padding: 0.5rem 1rem;
			font-size: 16pt;
			overflow: hidden;
			font-weight: 700;
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
				background: linear-gradient(30deg, #cc208e, #6713d2);
				-webkit-mask: linear-gradient(#fff 0 0) content-box,
					linear-gradient(#fff 0 0);
				-webkit-mask-composite: destination-out;
				mask-composite: exclude;
				opacity: 1;
				transition: all 600ms cubic-bezier(0.07, 0.71, 0.07, 0.71);
			}

			input {
				flex: 1;
				padding: 0;
				outline: none;
				border: none;
				font-size: 16pt;
				background: transparent;
				color: #efefef;
			}
		}

		.password-input {
			margin-top: 0.5rem;
			background-color: #1b1c24;
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
				background: linear-gradient(30deg, #cc208e, #6713d2);
				-webkit-mask: linear-gradient(#fff 0 0) content-box,
					linear-gradient(#fff 0 0);
				-webkit-mask-composite: destination-out;
				mask-composite: exclude;
				opacity: 1;
				transition: all 600ms cubic-bezier(0.07, 0.71, 0.07, 0.71);
			}

			input {
				border: none;
				outline: none;
				border-radius: 4pt;
				background-color: #1b1c24;
				padding: 0.5rem 1rem;
				font-size: 16pt;
				color: #efefef;
				width: 100%;
			}

			.peek-btn {
				cursor: pointer;
				position: absolute;
				right: 8px;
				top: 0;
				bottom: 0;
				padding: 0;
				background: transparent;
				outline: none;
				border: none;
				transition: transform 200ms ease;

				svg {
					height: 100%;
					width: 40px;
					padding: 0.5rem 0.25rem;

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
		}
	}
`;

const Login = ({ slug, onSubmit, submitting }) => {
	const [loginData, setLoginData] = useState({
		slug: slug ? slug : "",
		password: "",
	});

	const [error, setError] = useState("");

	const [visible, setVisible] = useState(false);
	const [clicked, setClicked] = useState(false);

	const history = useHistory();

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		if (name === "slug") {
			if (value === "" || slugRegEx.test(value)) {
				setError("");
				setLoginData((loginData) => ({
					...loginData,
					[name]: value,
				}));

				history.push(`/admin/${e.target.value}`);
			} else {
				setError(
					"Invalid character! A pico url contains only alphabets, numbers, and hyphens(-)."
				);
			}
		} else {
			setLoginData((loginData) => ({
				...loginData,
				[name]: value,
			}));
		}
	};

	return (
		<LoginContainer>
			<Header />
			<main className="content">
				<div className="title">Manage Picolink</div>
				<label>
					URL
					<div className="url-input">
						{`${window.location.host}/`}
						<input
							name="slug"
							type="text"
							placeholder="YourPicoLink"
							value={loginData.slug}
							onChange={handleChange}
						/>
					</div>
					<div className="error">
						{error !== ""
							? error
							: clicked && loginData.slug === ""
							? "Please enter the URL!"
							: ""}
					</div>
				</label>
				<label>
					Password
					<div className="password-input">
						<input
							name="password"
							type={visible ? "text" : "password"}
							value={loginData.password}
							onChange={handleChange}
							placeholder="Enter password"
						/>
						<button
							onMouseDown={() => {
								setVisible(!visible);
							}}
							className="peek-btn"
						>
							<EyeIcon className={visible ? "peek" : ""} />
						</button>
					</div>
					<div className="error">
						{clicked &&
							loginData.password === "" &&
							"Please enter the password!"}
					</div>
				</label>

				<OutlineButton
					disabled={clicked && (error !== "" || loginData.password === "")}
					onClick={() => {
						if (!submitting) {
							setClicked(true);
							if (loginData.slug !== "" && loginData.password !== "") {
								onSubmit(loginData.slug, loginData.password);
							}
						}
					}}
				>
					{submitting ? <HorizontalLoader /> : "Login"}
				</OutlineButton>
			</main>
		</LoginContainer>
	);
};

export default Login;
