import { Request, Response, NextFunction } from "express";

export interface ApiError extends Error {
	message: string;
	httpStatus?: number;
}

export const errors = {
	HOME_ENABLE_ADMINISTRATION_ERROR: {
		message: "Link not found or administration is already turned on!",
		httpStatus: 406,
	},
	HOME_LINK_NOT_FOUND: {
		message: "Link not found!",
		httpStatus: 404,
	},
	ADMIN_INCORRECT_PASSWORD: {
		message: "Incorrect password",
		httpStatus: 401,
	},
	ADMIN_NOT_ENABLED: {
		message: "Invalid slug or administration not enabled",
		httpStatus: 406,
	},
	ADMIN_DUPLICATE_SLUG: {
		message: "Link with this path already exists! Choose another path.",
		httpStatus: 409,
	},
};

export const errorHandler = (
	err: ApiError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err.httpStatus) {
		if (
			err.httpStatus === errors.HOME_LINK_NOT_FOUND.httpStatus &&
			err.message === errors.HOME_LINK_NOT_FOUND.message
		) {
			// TODO return redirect to react 404 page.
		}
		res.status(err.httpStatus).json({
			success: false,
			error: err.message,
		});
	} else {
		console.error(err);
		res.status(500).json({
			success: false,
			error: "Internal Server Error",
		});
	}
};
