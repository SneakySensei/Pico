import { useEffect, useState } from "react";
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
	const [sessionAuthData, _] = useState(getAuthDataFromSession(slug));
	const [adminData, setAdminData] = useState(null);

	useEffect(() => {
		if (sessionAuthData) {
			handleSubmit(sessionAuthData.slug, sessionAuthData.password);
		}
	}, []);

	const handleSubmit = (slug, password) => {
		// save to session storage
		axios
			.post("/api/admin/login", { slug, password })
			.then((res) => {
				console.log(res.data);
				setAuth(true);
				sessionStorage.setItem("authData", JSON.stringify({ slug, password }));
				setAdminData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (isAuth) {
		return <Dashboard adminData={adminData} />;
	} else {
		return <Login slug={slug} onSubmit={handleSubmit} />;
	}
};

export default Admin;
