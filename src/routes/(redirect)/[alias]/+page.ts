import { redirect } from '@sveltejs/kit';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const link = await (await fetch(`/api/links/${params.alias}`)).json();
	console.log(link);
	redirect(307, link?.url);
};
