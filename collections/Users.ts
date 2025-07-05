import type { CollectionConfig, PayloadRequest } from "payload";
import { isAdmin, isAdminFieldLevel } from "@/access/is-admin";
import { isAdminOrSelf } from "@/access/is-admin-or-self";

// Validation function to ensure unique usernames
const validateUniqueUsername = async (
	value: unknown,
	{ req, id }: { req: PayloadRequest; id?: string | number },
) => {
	if (!value || typeof value !== "string") return true;

	const existingUser = await req.payload.find({
		collection: "users",
		where: {
			username: {
				equals: value,
			},
		},
		limit: 1,
	});

	// If updating, exclude current user from check
	if (id && existingUser.docs.length > 0 && existingUser.docs[0].id === id) {
		return true;
	}

	if (existingUser.docs.length > 0) {
		return "Username already exists";
	}

	return true;
};

export const Users: CollectionConfig = {
	slug: "users",
	admin: {
		useAsTitle: "email",
	},
	access: {
		create: isAdmin,
		read: isAdminOrSelf,
		update: isAdminOrSelf,
		delete: isAdmin,
	},
	auth: true,
	fields: [
		{
			name: "username",
			type: "text",
			required: true,
			validate: validateUniqueUsername,
		},
		{
			type: "row",
			fields: [
				{
					name: "firstName",
					type: "text",
					required: true,
				},
				{
					name: "lastName",
					type: "text",
					required: true,
				},
			],
		},
		{
			name: "roles",
			saveToJWT: true,
			type: "select",
			defaultValue: ["user"],
			hasMany: true,
			options: [
				{ label: "Admin", value: "admin" },
				{ label: "User", value: "user" },
			],
			access: {
				// only admin can update create this field
				create: isAdminFieldLevel,
				update: isAdminFieldLevel,
			},
		},
	],
};
