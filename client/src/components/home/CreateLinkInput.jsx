import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
	background-color: #1b1c25;
	width: 100%;
	max-width: 960px;
	position: relative;
	border-radius: 4pt;
	transition: all 200ms ease;

	&::before {
		content: "";
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
			/* filter: saturate(1.2); */
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
`;

const CreateLinkInput = ({ url, onChange, onSubmit, disabled }) => {
	return (
		<InputContainer>
			<input
				disabled={disabled}
				value={url}
				onChange={onChange}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						onSubmit();
					}
				}}
				placeholder="https://"
			/>
		</InputContainer>
	);
};

export default CreateLinkInput;
