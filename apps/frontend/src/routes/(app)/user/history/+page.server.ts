import { getUserAttempts } from "$lib/api/attempts/get-user-attempts";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent, fetch }) => {
  const { session } = await parent();
  const history = await getUserAttempts(session.user.id, fetch);

  return {
    history,
  };
};
