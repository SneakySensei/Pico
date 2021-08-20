import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapContainer = styled.section`
	padding: 0 1rem;

	@media screen and (max-width: 480px) {
		padding: 0 0.5rem;
	}

	.map-container {
		height: 400px;
		width: 100%;
		max-width: 700px;
		margin: 0 auto;
		border-radius: 8pt;
		@media screen and (max-width: 560px) {
			height: 300px;
		}
		@media screen and (max-width: 400px) {
			height: 250px;
		}
	}
`;

const MapView = ({ visitsData }) => {
	const mapContainer = useRef(null);
	const map = useRef(null);

	const [mapLoaded, setMapLoaded] = useState(false);
	console.log(visitsData);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			accessToken:
				"pk.eyJ1Ijoic25lYWt5c2Vuc2VpIiwiYSI6ImNrc2p4NnduYTJpMDUyb29kOGx2OGJpcWIifQ.Lk8k4Tpmn1KsJ_7te2_rtg",
			container: mapContainer.current,
			style: "mapbox://styles/sneakysensei/ckskbm1f70qgf17qd18cc13iu",
			center: [0.0, 0.01],
			zoom: 0,
			maxZoom: 14,
		});

		map.current.on("load", () => {
			setMapLoaded(true);
			// ease to current geolocation
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;
					map.current.easeTo({
						center: [longitude, latitude],
						zoom: 5,
						duration: 5000,
					});
				});
			}
		});
	});

	useEffect(() => {
		if (mapLoaded && visitsData) {
			if (!map.current.getSource("visits")) {
				// convert visits to GeoJSON
				map.current.addSource("visits", {
					type: "geojson",
					data: {
						type: "FeatureCollection",
						features: visitsData.map((visit) => ({
							type: "feature",
							geometry: {
								type: "Point",
								coordinates: [visit.longitude, visit.latitude],
							},
						})),
						// oof: { type: "Point", coordinates: [88.3463, 22.4837] },
					},
				});
			}

			if (!map.current.getLayer("visits-heatmap"))
				map.current.addLayer(
					{
						id: "visits-heatmap",
						type: "heatmap",
						source: "visits",
						maxzoom: 15,
						paint: {
							// increase intensity as zoom level increases
							"heatmap-intensity": {
								stops: [
									[11, 1],
									[15, 3],
								],
							},
							// assign color values be applied to points depending on their density
							"heatmap-color": [
								"interpolate",
								["linear"],
								["heatmap-density"],
								0,
								"rgba(255,255,255,0)",
								0.2,
								"rgba(67, 172, 228, 0.6)",
								0.4,
								"rgba(83, 143, 230, 0.6)",
								0.6,
								"rgba(100, 114, 231, 0.6)",
								0.8,
								"rgba(117, 86, 234, 0.6)",
							],
							// increase radius as zoom increases
							"heatmap-radius": {
								stops: [
									[11, 15],
									[15, 20],
								],
							},
							// decrease opacity to transition into the circle layer
							"heatmap-opacity": {
								default: 1,
								stops: [
									[14, 1],
									[15, 0],
								],
							},
						},
					},
					"waterway-label"
				);
			// console.log("woah");
		}
	}, [mapLoaded, visitsData]);

	return (
		<MapContainer>
			<div ref={mapContainer} className="map-container" />
		</MapContainer>
	);
};

export default MapView;
