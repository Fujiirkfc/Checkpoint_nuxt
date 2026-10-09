export async function checkUserSession(event) {
  if (!event.context.auth || !event.context.auth.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
  return event.context.auth.user;
}
