import React from "react";
import styled from "styled-components";

const OutlineButtonContainer = styled.button`
	padding: 0.5rem 1.75rem;
	background-color: transparent;
	outline: none;
	border: 2px #efefef solid;
	border-radius: 4pt;
	font-size: 16pt;
	color: #efefef;
	cursor: pointer;
	transition: transform 400ms ease;
	position: relative;

	&::before {
		content: "";
		display: block;
		position: absolute;
		inset: 0;
		z-index: -1;
		background-image: linear-gradient(60deg, #6713d2, #cc208e, #6713d2);
		background-size: 200% 100%;
		background-position: right;
		opacity: 1;
		transition: opacity 400ms cubic-bezier(0.07, 0.71, 0.07, 0.71),
			background-position 400ms cubic-bezier(0.07, 0.71, 0.07, 0.71);
	}

	&:disabled {
		cursor: not-allowed;
		&::before {
			opacity: 0;
		}
	}

	&:hover {
		&::before {
			background-position: left;
		}
	}

	&:active {
		transform: translateY(8px);
	}
`;

const OutlineButton = ({ children, disabled, style, onClick }) => {
	return (
		<OutlineButtonContainer disabled={disabled} style={style} onClick={onClick}>
			{children}
		</OutlineButtonContainer>
	);
};

export default OutlineButton;
