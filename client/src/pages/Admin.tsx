import { useParams } from "react-router-dom";

export interface AdminPageParams {
	slug: string;
}

const Admin = () => {
	const { slug }: AdminPageParams = useParams();
	return <div>Admin panel: {slug}</div>;
};

export default Admin;
