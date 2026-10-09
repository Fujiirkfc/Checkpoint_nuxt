<template>
  <UHeader>
    <template #title>
      <p class="font-anton text-3xl">Checkpoint</p>
    </template>

    <UNavigationMenu :items="items" />

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>

    <template #right>
      <div v-if="loggedIn" class="flex items-center gap-2">
        <UButton @click="authStore.logout" variant="ghost" size="sm">logout</UButton>
      </div>
    </template>
  </UHeader>
</template>

<script setup>
const { loggedIn, user } = useUserSession();
import { useAuthStore } from "@/stores/user";
const authStore = useAuthStore();

const items = computed(() => {
  const baseItems = [
    {
      label: "Home",
      to: "/",
      active: false,
    },
  ];

  if (loggedIn.value) {
    baseItems.push({
      label: "Create event",
      to: "/events/create-event",
      active: false,
    });
  } else {
    baseItems.push({
      label: "Sign up/Log in",
      to: "/auth/sign-up",
      active: false,
    });
  }

  return baseItems;
});

onMounted(async () => {
  if (loggedIn.value) {
    authStore.login(user.value);
  }
});
</script>
