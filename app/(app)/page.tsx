import { headers as getHeaders } from "next/headers.js";
import Image from "next/image";
import { getPayload } from "payload";
import { fileURLToPath } from "url";

import config from "@/payload.config";

export default async function HomePage() {
	const headers = await getHeaders();
	const payloadConfig = await config;
	const payload = await getPayload({ config: payloadConfig });
	const { user } = await payload.auth({ headers });

	const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;

	return (
		<div className="flex min-h-screen flex-col bg-gray-50">
			<div className="flex flex-1 items-center justify-center p-8">
				<div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
					<div className="mb-6">
						<picture>
							<source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
							<Image
								alt="Payload Logo"
								height={65}
								src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
								width={65}
								className="mx-auto"
							/>
						</picture>
					</div>

					<h1 className="mb-6 font-bold text-2xl text-gray-900">
						{!user
							? "Welcome to your new project."
							: `Welcome back, ${user.email}`}
					</h1>

					<div className="space-y-3">
						<a
							className="block w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
							href={payloadConfig.routes.admin}
							rel="noopener noreferrer"
							target="_blank"
						>
							Go to admin panel
						</a>
						<a
							className="block w-full rounded-lg bg-gray-100 px-4 py-3 font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-200"
							href="https://payloadcms.com/docs"
							rel="noopener noreferrer"
							target="_blank"
						>
							Documentation
						</a>
					</div>
				</div>
			</div>

			<div className="bg-gray-100 px-8 py-4 text-center">
				<p className="mb-2 text-gray-600 text-sm">
					Update this page by editing
				</p>
				<a
					className="text-blue-600 transition-colors duration-200 hover:text-blue-800"
					href={fileURL}
				>
					<code className="rounded bg-gray-200 px-2 py-1 font-mono text-sm">
						app/(app)/page.tsx
					</code>
				</a>
			</div>
		</div>
	);
}
