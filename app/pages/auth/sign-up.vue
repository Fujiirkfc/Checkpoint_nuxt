<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md p-6">
      <h1 class="font-anton text-center mv-6 text-5xl">
        {{ type === "sign-up" ? "Sign up" : "Sign in" }}
      </h1>

      <UForm :schema="schema" :state="formData" @submit="onSubmit" class="space-y-4">
        <UFormField label="Email" name="email">
          <UInput v-model="formData.email" class="w-full" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="formData.password" type="password" class="w-full" />
        </UFormField>

        <UButton
          type="button"
          trailing-icon="i-lucide-arrow-left"
          variant="text"
          color="grey"
          @click="navigateTo('/')"
        >
          Go back
        </UButton>

        <UButton type="submit" trailing-icon="i-lucide-arrow-right" :loading="loading">
          {{ type === "sign-up" ? "Sign up" : "Sign in" }}
        </UButton>

        <USeparator />

        <UButton
          trailing-icon="mdi:account-alert-outline"
          variant="ghost"
          color="info"
          @click="type = type === 'sign-up' ? 'sign-in' : 'sign-up'"
        >
          {{ type === "sign-up" ? "I want to sign in" : "I want to sign up" }}
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup>
import * as yup from "yup";

const type = ref("sign-up");
const loading = ref(false);
const formData = reactive({
  email: "",
  password: "",
});

const schema = yup.object({
  email: yup.string().email("Invalid email").required("email is required"),
  password: yup
    .string()
    .min(6, "Password should have at least 6 characters")
    .required("password is required"),
});

async function onSubmit(event) {
  event.preventDefault();
  loading.value = true;
  try {
    await signUpHelper(formData, type.value);
  } finally {
    loading.value = false;
  }
}

definePageMeta({
  layout: "auth",
  middleware: ["sign-up-guard"],
});
</script>
