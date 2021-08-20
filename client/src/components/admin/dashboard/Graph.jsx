import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import _ from "lodash";
import styled from "styled-components";
import "chartjs-adapter-moment";

const GraphContainer = styled.section`
	padding: 0 1rem;
	margin-bottom: 1.5rem;

	@media screen and (max-width: 480px) {
		padding: 0 0.5rem;
	}

	.graph {
		background-color: #1b1c24;
		padding: 1rem 1.25rem 0.5rem 1.25rem;
		border-radius: 8pt;
		margin: 0 auto;
		width: 100%;
		max-width: 700px;
		position: relative;

		footer {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding-right: 20px;

			input[type="radio"] {
				display: none;

				& + label {
					font-size: 12pt;
					margin-left: 0.5rem;
					color: #efefef;
					cursor: pointer;
				}
				&:checked + label {
					color: #0b90d7;
					font-weight: 700;
				}
			}
		}
	}
`;

const getChartData = (visitsData, rangeFilter) => (canvas) => {
	const ctx = canvas.getContext("2d");
	const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
	gradient.addColorStop(0, "#6713D277");
	gradient.addColorStop(1, "#0B90D777");

	let days = [];
	if (rangeFilter === "week") {
		const endDate = moment().startOf("day");
		const startDate = moment().subtract(6, "days").startOf("day");
		for (
			let day = endDate;
			day.isSameOrAfter(startDate);
			day = day.clone().subtract(1, "day").startOf("day")
		) {
			days = [day.format(), ...days];
		}
	} else if (rangeFilter === "month") {
		const endDate = moment().startOf("day");
		const startDate = moment().subtract(29, "days").startOf("day");
		for (
			let day = endDate;
			day.isSameOrAfter(startDate);
			day = day.clone().subtract(1, "day").startOf("day")
		) {
			days = [day.format(), ...days];
		}
	} else if (rangeFilter === "year") {
		const endDate = moment().startOf("month");
		const startDate = moment().subtract(11, "months").startOf("month");
		for (
			let day = endDate;
			day.isSameOrAfter(startDate);
			day = day.clone().subtract(1, "month").startOf("month")
		) {
			days = [day.format(), ...days];
		}
	}

	const visitCountByDay = _.reduce(
		days,
		(obj, day) => {
			obj[day] = 0;
			return obj;
		},
		{}
	);

	let parsedVisitData = [];
	if (visitsData) {
		visitsData.forEach((visit) => {
			if (rangeFilter === "week") {
				const date = moment(visit.createdAt).startOf("day").format();
				if (moment(date in visitCountByDay)) {
					visitCountByDay[date]++;
				}
			} else if (rangeFilter === "month") {
				const date = moment(visit.createdAt).startOf("day").format();
				if (moment(date in visitCountByDay)) {
					visitCountByDay[date]++;
				}
			} else if (rangeFilter === "year") {
				const date = moment(visit.createdAt).startOf("month").format();
				if (moment(date in visitCountByDay)) {
					visitCountByDay[date]++;
				}
			}
		});
	}

	parsedVisitData = _.values(visitCountByDay);

	return {
		labels: days,
		datasets: [
			{
				label: "Visits",
				data: parsedVisitData,
				fill: "start",
				backgroundColor: gradient,
				borderColor: "#0080D1",
				pointBackgroundColor: "#0080D1",
				tension: 0.4,
				pointBorderWidth: 0,
				pointRadius: 3,
			},
		],
	};
};

const options = (rangeFilter) => ({
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: true,
			text: "Visit graph",
			padding: { top: 0, bottom: 10 },
			font: { size: 14 },
		},
		tooltip: {
			mode: "nearest",
			intersect: false,
			displayColors: false,
			callbacks: {
				title: (context) =>
					moment(context[0].label).format(
						rangeFilter === "year" ? "MMM, YYYY" : "MMM DD"
					),
			},
		},
	},
	scales: {
		y: {
			beginAtZero: true,
			ticks: {
				precision: 0,
			},
		},
		x: {
			ticks: {
				source: "data",
			},
			type: "time",
			time: {
				unit: rangeFilter === "year" ? "month" : "day",
			},
		},
	},
});

const LineChart = ({ visitsData }) => {
	// week | month | year
	const [rangeFilter, setRangeFilter] = useState("week");

	const handleFilterChange = (e) => {
		setRangeFilter(e.target.value);
	};

	return (
		<GraphContainer>
			<div className="graph">
				<Line
					data={getChartData(visitsData, rangeFilter)}
					options={options(rangeFilter)}
				/>
				<footer>
					<input
						name="filter"
						type="radio"
						value="week"
						id="radio-week-filter"
						onChange={handleFilterChange}
						checked={rangeFilter === "week"}
					/>
					<label htmlFor="radio-week-filter">7D</label>
					<input
						name="filter"
						type="radio"
						value="month"
						id="radio-month-filter"
						onChange={handleFilterChange}
						checked={rangeFilter === "month"}
					/>
					<label htmlFor="radio-month-filter">30D</label>
					<input
						name="filter"
						type="radio"
						value="year"
						id="radio-year-filter"
						onChange={handleFilterChange}
						checked={rangeFilter === "year"}
					/>
					<label htmlFor="radio-year-filter">12M</label>
				</footer>
			</div>
		</GraphContainer>
	);
};

export default LineChart;
