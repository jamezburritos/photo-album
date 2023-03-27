import { Avatars } from 'appwrite'
import type { LayoutServerLoad } from './$types'

type OutputType = {
	name: string
	avatar: string
}

export const load: LayoutServerLoad<OutputType> = ({ locals }) => {
	const avatars = new Avatars(locals.client)

	if (!locals.user) {
		return { name: '', avatar: '' }
	}

	return {
		name: locals.user.name,
		avatar: avatars.getInitials(locals.user.name, 40, 40).toString()
	}
}
