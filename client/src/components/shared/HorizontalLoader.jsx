import React from "react";
import styled from "styled-components";

const HorizontalLoaderContainer = styled.div`
	display: inline-block;
	position: relative;
	width: 61px;
	height: 13px;

	div {
		position: absolute;
		top: 0px;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background: #fff;
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}
	div:nth-child(1) {
		left: 0px;
		animation: lds-ellipsis1 0.6s infinite;
	}
	div:nth-child(2) {
		left: 0px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	div:nth-child(3) {
		left: 24px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	div:nth-child(4) {
		left: 48px;
		animation: lds-ellipsis3 0.6s infinite;
	}
	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(24px, 0);
		}
	}
`;

const HorizontalLoader = ({ style = {} }) => {
	return (
		<HorizontalLoaderContainer style={style}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</HorizontalLoaderContainer>
	);
};

export default HorizontalLoader;
