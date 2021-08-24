import { toast } from "react-toastify";

import { ReactComponent as ErrorIcon } from "assets/error-icon.svg";

export const handleError = (err) => {
	console.log(err.response);
	if (err?.response?.data?.error) {
		toast.dark(
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-start",
				}}
			>
				<ErrorIcon
					style={{ marginRight: "0.75rem", width: "24px", height: "24px" }}
				/>
				<span style={{ flex: 1 }}>{err.response.data.error}</span>
			</div>,
			{
				position: "bottom-center",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				closeButton: false,
			}
		);
	} else {
		toast.dark(
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-start",
				}}
			>
				<ErrorIcon
					style={{ marginRight: "0.75rem", width: "24px", height: "24px" }}
				/>
				<span style={{ flex: 1 }}>Something went wrong!</span>
			</div>,
			{
				position: "bottom-center",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				closeButton: false,
			}
		);
	}
};
