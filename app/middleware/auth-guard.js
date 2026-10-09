export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn, fetch: fetchUser } = useUserSession();
  await fetchUser();

  if (!loggedIn.value) {
    return navigateTo("/auth/sign-up");
  }
});
