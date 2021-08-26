import styled from "styled-components";

export const HomeContainer = styled.main`
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

		@media screen and (max-width: 480px) {
			padding: 0 1rem;
		}
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
		flex-direction: column;
		align-items: center;
		margin-top: 2rem;
		min-height: 170px;

		.admin-link {
			margin-top: 1rem;
			font-size: 16pt;
			text-decoration: underline;
			cursor: pointer;
		}

		.password-msg {
			margin-top: 1rem;
			text-align: center;
			color: #f44336;
			font-weight: 500;
		}
	}
`;

export const GradientTextButton = styled.button`
	border: none;
	outline: none;
	position: relative;
	font-size: 18pt;
	font-weight: bold;
	color: #efefef;
	background: linear-gradient(to right, #cc208e, #6713d2);

	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;

	@media screen and (max-width: 420px) {
		font-size: 16pt;
	}

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

	&:hover:not(:disabled)::before {
		transform: scaleX(1);
		opacity: 1;
	}
`;

export const Toast = styled.article`
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

export const toastTransitionStyles = {
	entering: { opacity: 1, transform: "translate(-50%, 0rem)" },
	entered: { opacity: 1, transform: "translate(-50%, 0rem)" },
	exiting: { opacity: 0, transform: "translate(-50%, 0rem)" },
	exited: { opacity: 0, transform: "translate(-50%, 3rem)" },
};
