import React, { useState } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import { ReactComponent as HelpIcon } from "assets/help-icon.svg";
import { ReactComponent as CrossIcon } from "assets/cross-icon.svg";
import { ReactComponent as PrevIcon } from "assets/prev-icon.svg";
import { ReactComponent as NextIcon } from "assets/next-icon.svg";

const Container = styled.div`
	position: fixed;
	bottom: 1rem;
	right: 1.5rem;
	height: 32px;
	width: 32px;
	z-index: 10;

	@media screen and (max-width: 480px) {
		bottom: 1rem;
		right: 1rem;
	}

	svg {
		filter: brightness(0.7);
		transition: all 200ms linear;
		cursor: pointer;

		&:hover {
			filter: brightness(1);
		}
	}

	.help-section {
		position: fixed;
		transition: all 300ms ease-in-out;
		padding: 1rem;
		display: grid;
		place-items: center;

		&-enter,
		&-appear {
			/* height: 32px;
			width: 32px; */
			bottom: 1rem;
			top: calc(100vh - 1rem - 32px);
			left: calc(100vw - 1.5rem - 32px);
			right: 1rem;
			opacity: 0;
		}
		&-enter-active,
		&-enter-done,
		&-appear-active,
		&-appear-done,
		&-exit {
			/* width: calc(100vw - 2rem);
			height: calc(100vh - 2rem); */
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			opacity: 1;
		}
		&-exit-active {
			/* height: 32px;
			width: 32px; */
			bottom: 1rem;
			top: calc(100vh - 1rem - 32px);
			left: calc(100vw - 1.5rem - 32px);
			right: 1.5rem;
			opacity: 0;
		}

		.content {
			background-color: #1b1c24;
			border-radius: 4pt;
			max-width: 800px;
			min-width: 0;
			width: 100%;
		}

		header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1rem;
			margin: 0 1rem;
			border-bottom: 1px solid #121013;

			h1 {
				margin: 0;
				line-height: 1;
			}
			svg {
				width: 24px;
				height: 24px;
			}
		}
		section {
			padding: 1rem 0 1.5rem 0;
			margin: 0 1.5rem;

			.slick-dots {
				bottom: -16px;
			}

			.slick-prev {
				height: 100%;
				left: -20px;
				z-index: 50;
			}

			.slick-next {
				height: 100%;
				right: -20px;
				z-index: 50;
			}

			img {
				width: 100%;
				margin: 0 auto;
				height: auto;
			}
		}
	}
`;

const NextButton = ({ className, style, onClick }) => (
	<NextIcon
		className={className}
		style={style}
		onClick={(e) => {
			e.stopPropagation();
			onClick(e);
		}}
	/>
);

const PrevButton = ({ className, style, onClick }) => (
	<PrevIcon
		className={className}
		style={style}
		onClick={(e) => {
			e.stopPropagation();
			onClick(e);
		}}
	/>
);

const HowToUse = () => {
	const [helpVisible, setHelpVisible] = useState(
		localStorage.getItem("visited") ? false : true
	);

	const settings = {
		dots: true,
		infinite: true,
		autoplay: true,
		speed: 500,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <NextButton />,
		prevArrow: <PrevButton />,
	};

	return (
		<Container>
			<HelpIcon
				onClick={() => {
					setHelpVisible(true);
				}}
			/>
			<CSSTransition
				in={helpVisible}
				appear={true}
				timeout={300}
				classNames="help-section"
				mountOnEnter={true}
				unmountOnExit={true}
				onEntering={() => document.body.classList.add("modal-open")}
				onExited={() => {
					document.body.classList.remove("modal-open");
					localStorage.setItem("visited", true);
				}}
			>
				<div
					className="help-section"
					onClick={() => {
						setHelpVisible(false);
					}}
				>
					<div className="content">
						<header>
							<div>
								<h1>
									{localStorage.getItem("visited") ? "Help" : "Hi there!"}
								</h1>
							</div>
							<CrossIcon
								onClick={() => {
									setHelpVisible(false);
								}}
							/>
						</header>
						{/* <main> */}
						<section>
							<Slider {...settings}>
								<div>
									<img src="/tuts/slide-0.png" alt="1/6" />
								</div>
								<div>
									<img src="/tuts/slide-1.png" alt="1/6" />
								</div>
								<div>
									<img src="/tuts/slide-2.png" alt="2/6" />
								</div>
								<div>
									<img src="/tuts/slide-3.png" alt="3/6" />
								</div>
								<div>
									<img src="/tuts/slide-4.png" alt="4/6" />
								</div>
								<div>
									<img src="/tuts/slide-5.png" alt="5/6" />
								</div>
							</Slider>
							{/* <div>
								
								<span>1/6</span>
							</div>
							<div>
								<span>1/6</span>
							</div>
							<div>
								<span>2/6</span>
							</div>
							<div>
								<span>3/6</span>
							</div>
							<div>
								<span>4/6</span>
							</div>
							<div>
								<span>5/6</span>
							</div> */}
						</section>
						{/* </main> */}
					</div>
				</div>
			</CSSTransition>
		</Container>
	);
};

export default HowToUse;
