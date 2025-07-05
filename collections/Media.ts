import type { CollectionConfig } from "payload";
import { isAdmin } from "../access/is-admin";
import { isLoggedIn } from "../access/is-logged-in";

export const Media: CollectionConfig = {
	slug: "media",
	access: {
		read: ({ req }) => {
			// Admin can read all media
			if (isAdmin({ req })) {
				return true;
			}

			// Logged in users can only read their own media
			if (isLoggedIn({ req })) {
				return {
					user: {
						equals: req.user?.id,
					},
				};
			}

			return false;
		},
		create: ({ req }) => {
			// Admin can create media
			if (isAdmin({ req })) {
				return true;
			}

			// Logged in users can create media
			return isLoggedIn({ req });
		},
		update: ({ req }) => {
			// Admin can update all media
			if (isAdmin({ req })) {
				return true;
			}

			// Logged in users can only update their own media
			if (isLoggedIn({ req })) {
				return {
					user: {
						equals: req.user?.id,
					},
				};
			}

			return false;
		},
		delete: ({ req }) => {
			// Admin can delete all media
			if (isAdmin({ req })) {
				return true;
			}

			// Logged in users can only delete their own media
			if (isLoggedIn({ req })) {
				return {
					user: {
						equals: req.user?.id,
					},
				};
			}

			return false;
		},
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
		},
		{
			name: "user",
			type: "relationship",
			required: true,
			relationTo: "users",
			admin: {
				condition: (_data, _siblingData, ctx) => {
					// Only show for admin users
					return Boolean(ctx.user?.roles?.includes("admin"));
				},
			},
			defaultValue: ({ user }) => {
				// If user is not admin, default to their ID
				if (user && !user.roles?.includes("admin")) {
					return user.id;
				}
				return undefined;
			},
		},
	],
	upload: true,
};
