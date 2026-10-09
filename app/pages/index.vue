<template>
  <div
    v-if="!loggedIn"
    class="min-h-screen flex items-center justify-center from-blue-50 to-indigo-100"
  >
    <div class="text-center p-8 max-w-md mx-auto">
      <div class="space-y-6">
        <h1 class="text-4xl font-bold text-gray-800 leading-tight">
          Log in to post and access new events
        </h1>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <UButton to="/auth/sign-up" variant="outline" size="lg" class="px-8"> Log In </UButton>
        </div>
      </div>
    </div>
  </div>
  <div v-else><HomeEvents /></div>
</template>

<script setup>
const { loggedIn } = useUserSession();
</script>
