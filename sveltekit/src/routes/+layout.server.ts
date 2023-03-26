import { Avatars } from "appwrite";
import type { LayoutServerLoad } from "./$types";

type OutputType = {
    avatar: string
}

export const load: LayoutServerLoad<OutputType> = ({ locals }) => {
    const avatars = new Avatars(locals.client);

    if (!locals.user) {
        return { avatar: "" }
    }

    return {
        avatar: avatars.getInitials(locals.user.name, 40, 40).toString()
    }
}
