import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
	background-color: #1b1c25;
	width: 100%;
	max-width: 960px;
	position: relative;
	border-radius: 8px;

	&::before {
		content: "";
		pointer-events: none;
		position: absolute;
		inset: 0;
		border-radius: 8px;
		padding: 3px;
		background: linear-gradient(to right, #cc208e, #6713d2);
		-webkit-mask: linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: destination-out;
		mask-composite: exclude;
	}

	input {
		all: unset;
		width: 100%;
		font-size: 24px;
		padding: 0.75rem 1rem;
	}
`;

const CreateLinkInput = () => {
	return (
		<InputContainer>
			<input />
		</InputContainer>
	);
};

export default CreateLinkInput;
