import { useParams } from "react-router-dom";

const Admin = () => {
	const { slug } = useParams();
	return <div>Admin panel: {slug}</div>;
};

export default Admin;
