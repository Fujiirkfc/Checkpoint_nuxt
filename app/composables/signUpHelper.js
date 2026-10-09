import { useAuthStore } from "@/stores/user";

export const signUpHelper = async (formData, type) => {
  const { fetch: refreshSession } = useUserSession();
  const authStore = useAuthStore();
  const toast = useToast();
  let response;

  try {
    if (type === "sign-up") {
      response = await $fetch("/api/auth/sign-up", {
        method: "POST",
        body: formData,
      });
    } else {
      response = await $fetch("/api/auth/sign-in", {
        method: "POST",
        body: formData,
      });
    }
    authStore.login(response.user);
    toast.add({
      title: "Congratulation",
      description: "Welcome !!!",
      color: "success",
    });
    await refreshSession();
    await navigateTo("/");

    return true;
  } catch (error) {
    if (error.statusCode === 400 && error.data?.data) {
      const validationError = error.data.data.errorsArray;
      validationError.forEach((err) => {
        toast.add({
          title: "Oops",
          description: err,
          color: "error",
        });
      });
    } else {
      toast.add({
        title: "Oops",
        description: error.data?.statusMessage || "Sorry, something happened",
        color: "error",
      });
    }

    return false;
  }
};
