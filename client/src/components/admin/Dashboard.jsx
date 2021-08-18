import React from "react";
import styled from "styled-components";

import { ReactComponent as BackGradient } from "assets/admin-bg.svg";
import Header from "./dashboard/Header";

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
		h1 {
			font-size: 52pt;
			line-height: 1;
			margin: 0;
			text-align: center;
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
		</DashboardContainer>
	);
};

export default Dashboard;
