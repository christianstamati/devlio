import type { CollectionConfig } from "payload";
import { isAdminOrProjectOwner } from "@/access/is-admin-or-project-owner";

export const Projects: CollectionConfig = {
	slug: "projects",
	access: {
		read: isAdminOrProjectOwner,
		create: isAdminOrProjectOwner,
		update: isAdminOrProjectOwner,
		delete: isAdminOrProjectOwner,
	},
	fields: [
		{
			name: "name",
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
};
