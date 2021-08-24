import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { slugRegEx, urlRegEx } from "services/utils";
import { handleError } from "services/toasts";

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

			.input-group {
				margin-top: 0.5rem;
				display: flex;
				align-items: flex-start;
				flex-wrap: wrap;

				@media screen and (max-width: 660px) {
					flex-direction: column;
					align-items: stretch;
				}
				.error {
					width: 100%;
					font-size: 11pt;
					order: 1;
					color: #f44336;

					@media screen and (max-width: 660px) {
						order: unset;
					}
				}

				.input-container {
					/* order: 2; */

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
					/* order: 3; */

					all: unset;
					border: 2px solid #f44336;
					color: #f44336;
					border-radius: 4pt;
					padding: 0.25rem 1rem;
					font-size: 14pt;
					cursor: pointer;
					margin: 0 0 0 1rem;
					transition: all 200ms ease;

					&:not(:disabled):hover {
						color: #efefef;
						background-color: #f44336;
					}

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

	const history = useHistory();

	const handlePicolinkChange = (e) => {
		setPicolink((picolink) => ({ ...picolink, value: e.target.value }));
	};

	const handlePicolinkSave = (e) => {
		e.preventDefault();

		if (slugRegEx.test(picolink.value)) {
			setPicolink((picolink) => ({ ...picolink, progress: true }));
			const { password } = JSON.parse(sessionStorage.getItem("authData"));
			axios
				.put(`/api/admin/editSlug/${adminData.slug}`, {
					newSlug: picolink.value,
					password,
				})
				.then((res) => {
					sessionStorage
						.setItem(
							"authData",
							JSON.stringify({ slug: res.data.slug, password: password })
						)
						.catch((err) => {
							handleError(err);
						});
					history.replace(`/admin/${res.data.slug}`);
					document.body.scrollTo({ behavior: "auto", top: 0 });
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

	const handleDestinationChange = (e) => {
		setDestination((destination) => ({
			...destination,
			value: e.target.value,
			error:
				destination.error !== "" && urlRegEx.test(e.target.value)
					? ""
					: destination.error,
		}));
	};

	const handleDestinationSave = (e) => {
		e.preventDefault();
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
				})
				.catch((err) => {
					handleError(err);
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
				<form onSubmit={handlePicolinkSave}>
					<label>
						Edit Picolink
						<div className="input-group">
							<span className="input-container">
								https://pico.snehil.dev/
								<input
									value={picolink.value}
									onChange={handlePicolinkChange}
									placeholder="NewPicoLink"
									type="text"
								/>
							</span>
							<div className="error">
								{picolink.error !== "" && picolink.error}
							</div>
							<button
								type="submit"
								disabled={picolink.value === "" || picolink.error !== ""}
							>
								{picolink.progress ? "Saving..." : "Save"}
							</button>
						</div>
					</label>
				</form>
				<form onSubmit={handleDestinationSave}>
					<label>
						Edit Destination
						<div className="input-group">
							<span className="input-container">
								<input
									type="text"
									value={destination.value}
									disabled={destination.progress}
									onChange={handleDestinationChange}
									placeholder="https://destination.new"
								/>
							</span>
							<div className="error">
								{destination.error !== "" && destination.error}
							</div>
							<button
								disabled={
									destination.value === "" ||
									destination.error !== "" ||
									destination.progress
								}
							>
								{destination.progress ? "Saving..." : "Save"}
							</button>
						</div>
					</label>
				</form>
			</article>
		</DangerZoneContainer>
	);
};

export default DangerZone;
