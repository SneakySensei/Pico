import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Dashboard, Login } from "components/admin";
import axios from "axios";
import { handleError } from "services/toasts";

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

	const [submitting, setSubmitting] = useState(false);
	const [isAuth, setAuth] = useState(false);
	const [adminData, setAdminData] = useState(null);

	useEffect(() => {
		const authData = JSON.parse(sessionStorage.getItem("authData"));
		if (authData && authData.slug === slug) {
			setAuth(true);
			handleSubmit(authData.slug, authData.password);
		}
	}, []);

	const handleSubmit = (slug, password) => {
		setSubmitting(true);
		// save to session storage
		axios
			.post("/api/admin/login", { slug, password })
			.then((res) => {
				sessionStorage.setItem("authData", JSON.stringify({ slug, password }));
				setAdminData(res.data);
				setAuth(true);
				setSubmitting(false);
			})
			.catch((err) => {
				sessionStorage.removeItem("authData");
				handleError(err);
				setSubmitting(false);
			});
	};

	return (
		<>
			{isAuth ? (
				<Dashboard adminData={adminData} />
			) : (
				<Login slug={slug} onSubmit={handleSubmit} submitting={submitting} />
			)}
		</>
	);
};

export default Admin;
