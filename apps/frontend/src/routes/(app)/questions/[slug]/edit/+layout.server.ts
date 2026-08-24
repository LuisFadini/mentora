import { hasPermission } from "@mentora/permissions";
import { error } from "@sveltejs/kit";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ parent }) => {
  const { session } = await parent();

  if (!hasPermission(session.user, "questions.update")) {
    error(403, "Forbidden");
  }
};
