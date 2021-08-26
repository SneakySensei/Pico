import React from "react";
import styled from "styled-components";

import { ReactComponent as Ufo } from "assets/404-ufo.svg";

const PageContainer = styled.main`
	display: grid;
	align-content: center;
	place-items: center;
	padding: 0 1rem;
	min-height: 100vh;

	svg {
		max-width: 700px;
		width: 100%;
	}
	article {
		margin-top: 2rem;
		text-align: center;
	}
`;

const Error404 = () => {
	return (
		<PageContainer>
			<Ufo />
			<article>
				The page you're looking for was not found! Maybe the aliens took it or
				maybe it was never there!
			</article>
		</PageContainer>
	);
};

export default Error404;
