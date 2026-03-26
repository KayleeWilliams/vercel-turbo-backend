import { getConfigInfo } from '@repo/shared-config';

export default async function handler(request: Request): Promise<Response> {
	if (request.method !== 'GET') {
		return new Response(JSON.stringify({ error: 'Method not allowed' }), {
			status: 405,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	return new Response(
		JSON.stringify({
			...getConfigInfo(),
			runtime: 'plain-vercel-app',
		}),
		{
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		}
	);
}
