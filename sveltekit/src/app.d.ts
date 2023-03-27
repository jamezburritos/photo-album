import type { Account, Client, Models } from 'appwrite'

declare global {
	namespace App {
		interface Locals {
			client: Client
			account: Account
			user?: Models.Account
		}

		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
