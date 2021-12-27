import React from "react";
import styled from "styled-components";

import { ReactComponent as BackGradient } from "assets/admin-bg.svg";
import Header from "./dashboard/Header";
import Graph from "./dashboard/Graph";
import MapView from "./dashboard/Map";
import DangerZone from "./dashboard/DangerZone";
import Hero from "./dashboard/Hero";
import { Footer } from "components/shared";

const DashboardContainer = styled.main`
	position: relative;
	min-height: 100vh;

	.gradient {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: -10;
		width: 100%;
		height: auto;
		min-height: 60vh;
		max-height: 80vh;
		filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 1));
	}

	.visits {
		width: min-content;
		margin: 4rem auto 0;

		@media screen and (max-width: 360px) {
			margin: 2.5rem auto 2rem;
		}

		h1 {
			font-size: 64pt;
			line-height: 1;
			margin: 0;
			text-align: center;

			@media screen and (max-width: 640px) {
				font-size: 58pt;
			}

			@media screen and (max-width: 570px) {
				font-size: 52pt;
			}

			@media screen and (max-width: 510px) {
				font-size: 46pt;
			}

			@media screen and (max-width: 450px) {
				font-size: 40pt;
			}

			@media screen and (max-width: 400px) {
				font-size: 34pt;
			}

			@media screen and (max-width: 340px) {
				font-size: 30pt;
			}
		}
		div {
			font-size: 16pt;
			text-align: center;
			white-space: nowrap;
		}
	}
`;

const Dashboard = ({ adminData }) => {
	return (
		<DashboardContainer>
			<BackGradient className="gradient" />
			<Header />
			<article className="visits">
				<h1>
					{adminData
						? Intl.NumberFormat().format(adminData.visits.length)
						: "..."}
				</h1>
				<div>Total Visits</div>
			</article>
			<Hero adminData={adminData} />
			<Graph visitsData={adminData?.visits} />
			<MapView visitsData={adminData?.visits} />
			<DangerZone adminData={adminData} />
			<Footer />
		</DashboardContainer>
	);
};

export default Dashboard;
