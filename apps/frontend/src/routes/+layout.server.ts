import type { LayoutServerLoad } from "./$types";
import { getSession } from "$lib/api/users/get-session";

export const load: LayoutServerLoad = async ({ fetch }) => {
  const session = await getSession(fetch);

  return {
    session: session ?? null,
  };
};
