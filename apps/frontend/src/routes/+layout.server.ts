import { getSession } from "$lib/api/users/get-session";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ fetch }) => {
  const session = await getSession(fetch);

  return {
    session: session ?? null,
  };
};
