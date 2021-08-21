import axios from "axios";
import React, { useState } from "react";
import { urlRegEx } from "services/utils";
import styled from "styled-components";

const DangerZoneContainer = styled.section`
	padding: 0 1rem;
	margin: 1.5rem 0;

	@media screen and (max-width: 480px) {
		padding: 0 0.5rem;
	}

	article {
		width: 100%;
		max-width: 700px;
		margin: 0 auto;
		padding: 1rem 1rem 2rem;
		border-radius: 8pt;
		border: 1px dashed #f44336;

		h1 {
			margin: 0;
			font-size: 20pt;
		}

		label {
			font-size: 14pt;
			display: block;
			margin-top: 1rem;

			div {
				display: flex;
				align-items: flex-start;

				@media screen and (max-width: 660px) {
					flex-direction: column;
				}

				.input-container {
					background-color: #1b1c24;
					font-size: 14pt;
					padding: 6px 1rem;
					flex: 1;
					display: flex;
					align-items: center;
					border-radius: 4pt;
					cursor: text;
					flex-wrap: wrap;
					input {
						all: unset;
						flex: 1;
						font-size: 14pt;
						background: transparent;
						/* min-width: 0; */
					}
				}

				button {
					all: unset;
					border: 2px solid #f44336;
					color: #f44336;
					border-radius: 4pt;
					padding: 0.25rem 1rem;
					font-size: 14pt;
					cursor: pointer;
					margin: 0 0 0 1rem;

					&:disabled {
						opacity: 0.5;
						cursor: not-allowed;
					}

					@media screen and (max-width: 660px) {
						align-self: flex-start;
						margin: 1rem 0 0 0;
					}
				}
			}
		}
	}
`;

const DangerZone = ({ adminData }) => {
	const [picolink, setPicolink] = useState({
		value: "",
		error: "",
		progress: false,
	});
	const [destination, setDestination] = useState({
		value: "",
		error: "",
		progress: false,
	});

	const handlePicolinkChange = (e) => {
		setPicolink((picolink) => ({ ...picolink, value: e.target.value }));
	};

	const handleDestinationChange = (e) => {
		setDestination((destination) => ({
			...destination,
			value: e.target.value,
		}));
	};

	const handleDestinationSave = (e) => {
		console.log("click");
		if (urlRegEx.test(destination.value)) {
			setDestination((destination) => ({ ...destination, progress: true }));
			const { password } = JSON.parse(sessionStorage.getItem("authData"));
			axios
				.put(`/api/admin/editDestination/${adminData.slug}`, {
					newDestination: destination.value,
					password,
				})
				.then((res) => {
					window.location.reload();
				});
			// update
			// clear input
		} else {
			setDestination((destination) => ({
				...destination,
				error: "Not a valid url",
			}));
		}
	};

	return (
		<DangerZoneContainer>
			<article>
				<h1>Danger Zone</h1>
				<label>
					Edit Picolink
					<div>
						<span className="input-container">
							https://pico.snehil.dev/
							<input
								value={picolink.value}
								onChange={handlePicolinkChange}
								placeholder="NewPicoLink"
								type="text"
							/>
						</span>
						<button disabled={picolink.value === "" || picolink.error !== ""}>
							Save
						</button>
					</div>
				</label>
				<label>
					Edit Destination
					<div>
						<span className="input-container">
							<input
								type="text"
								value={destination.value}
								disabled={destination.progress}
								onChange={handleDestinationChange}
								placeholder="https://destination.new"
							/>
							<div>{destination.error !== "" && destination.error}</div>
						</span>
						<button
							disabled={
								destination.value === "" ||
								destination.error !== "" ||
								destination.progress
							}
							onClick={handleDestinationSave}
						>
							{destination.progress ? "Saving..." : "Save"}
						</button>
					</div>
				</label>
			</article>
		</DangerZoneContainer>
	);
};

export default DangerZone;
