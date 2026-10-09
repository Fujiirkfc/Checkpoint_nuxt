export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event);
    const user = session?.user;

    if (user) {
      event.context.auth = { user: user };
    } else {
      event.context.auth = { user: null };
    }
  } catch (err) {}
});
