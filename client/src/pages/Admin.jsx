import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { Dashboard, Login } from "components/admin";
import axios from "axios";

const getAuthDataFromSession = (slug) => {
	const authData = JSON.parse(sessionStorage.getItem("authData"));
	if (authData?.slug !== slug) {
		sessionStorage.removeItem("authData");
		return null;
	}
	return authData;
};

const Admin = () => {
	const { slug } = useParams();

	const [isAuth, setAuth] = useState(
		getAuthDataFromSession(slug) ? true : false
	);
	const [adminData, setAdminData] = useState(null);

	useEffect(() => {
		const sessionAuthData = getAuthDataFromSession(slug);
		if (sessionAuthData) {
			handleSubmit(sessionAuthData.slug, sessionAuthData.password);
		}
	}, []);

	const handleSubmit = (slug, password) => {
		// save to session storage
		axios
			.post("/api/admin/login", { slug, password })
			.then((res) => {
				setAuth(true);
				sessionStorage.setItem("authData", JSON.stringify({ slug, password }));
				setAdminData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			{isAuth ? (
				<Dashboard adminData={adminData} />
			) : (
				<Login slug={slug} onSubmit={handleSubmit} />
			)}
		</>
	);
};

export default Admin;
