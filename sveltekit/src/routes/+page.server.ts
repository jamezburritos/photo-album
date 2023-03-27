import type { PageServerLoad } from './$types'

type OutputType = {
	projectID: string
	bucketID: string
}

// TODO: move these into environment variables
const PROJECT_ID = '641ef1dc8914497e30e6'
const PHOTOS_BUCKET = '641f145ba5751d06a8ab'

export const load: PageServerLoad<OutputType> = async () => {
	return {
		projectID: PROJECT_ID,
		bucketID: PHOTOS_BUCKET
	}
}
