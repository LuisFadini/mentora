import { hasPermission } from "@mentora/permissions";
import { error, redirect } from "@sveltejs/kit";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ parent }) => {
  const { session } = await parent();

  if (!session || !session.authenticated) {
    redirect(303, "/login");
  }

  if (!hasPermission(session.user, "questions.create")) {
    error(401, "Unauthorized");
  }
};
