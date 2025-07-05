import type { Access } from "payload";
import type { Project } from "@/payload-types";

export const isAdminOrProjectOwner: Access<Project> = ({ req: { user } }) => {
	// Need to be logged in
	if (user) {
		// If user has role of 'admin'
		if (user.roles?.includes("admin")) {
			return true;
		}
		// If any other type of user, only provide access to their own projects
		return {
			user: {
				equals: user.id,
			},
		};
	}
	// Reject everyone else
	return false;
};
