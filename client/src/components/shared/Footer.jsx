import React from "react";
import styled from "styled-components";
import GitHubButton from "react-github-btn";

const FooterContainer = styled.footer`
	/* background: #080708; */
	background: linear-gradient(30deg, #0b90d7, #6713d2);
	padding: 1rem 1rem 0.5rem;
	a {
		color: #efefef;
	}

	article {
		text-align: center;
	}

	section {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 0.5rem;

		span:not(:last-child) {
			margin-right: 1rem;
		}
	}
`;

const Footer = () => {
	return (
		<FooterContainer>
			<article>
				Made with{" "}
				<svg
					width="18"
					height="15"
					viewBox="0 0 18 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M16.8324 1.79325C14.9346 -0.458366 11.525 -0.58703 9.49853 1.47159C9.20903 1.76109 8.75871 1.76109 8.50138 1.47159C6.57142 -0.490532 3.38699 -0.490532 1.45703 1.47159C-0.215603 3.11206 -0.472932 5.78184 0.813708 7.74397C1.1997 8.35512 1.71436 8.83761 2.26118 9.19144L8.66221 14.3702C8.88737 14.5632 9.20903 14.5632 9.4342 14.3702L15.8031 9.19144C16.3499 8.83761 16.8324 8.38729 17.2184 7.77613C18.3763 5.94267 18.2477 3.46589 16.8324 1.79325V1.79325Z"
						fill="#FF473E"
					/>
				</svg>{" "}
				by{" "}
				<a href="https://snehil.dev/" target="_blank" rel="noreferrer">
					Snehil
				</a>
			</article>
			<section>
				<GitHubButton
					href="https://github.com/sneakysensei/pico"
					data-color-scheme="no-preference: dark; light: dark; dark: dark;"
					data-icon="octicon-star"
					data-size="large"
					data-show-count="true"
					aria-label="Star sneakysensei/pico on GitHub"
				>
					Star
				</GitHubButton>
				<GitHubButton
					href="https://github.com/sneakysensei/pico/issues"
					data-color-scheme="no-preference: dark; light: dark; dark: dark;"
					data-icon="octicon-issue-opened"
					data-size="large"
					data-show-count="true"
					aria-label="Issue sneakysensei/pico on GitHub"
				>
					Issue
				</GitHubButton>
			</section>
		</FooterContainer>
	);
};

export default Footer;
