<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md p-6">
      <h1 class="font-anton text-left mb-6 text-5xl">Create Event</h1>
      <UForm :schema="schema" :state="formData" @submit="onSubmit" class="space-y-4">
        <UFormField label="Title" name="title">
          <UInput v-model="formData.title" class="w-full" placeholder="Event title" />
        </UFormField>

        <UFormField label="Content" name="content">
          <UTextarea
            autoresize
            v-model="formData.content"
            class="w-full"
            placeholder="Enter event details..."
          />
        </UFormField>

        <UPopover>
          <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
            {{ formData.date ? format(formData.date, "d MMM, yyyy") : "Select a date" }}
          </UButton>
          <template #content>
            <UCalendar class="p-2" v-model="formData.date" />
          </template>
        </UPopover>

        <UButton type="submit" :loading="loading" class="w-full" size="lg"> Create event </UButton>

        <div v-if="errors.length" class="mt-4">
          <UBadge color="error" v-for="(error, index) in errors" :key="index + error">
            {{ error }}
          </UBadge>
        </div>
      </UForm>
    </div>
  </div>
</template>

<script setup>
import * as yup from "yup";
import { format } from "date-fns";
const toast = useToast();

const loading = ref(false);
const errors = ref([]);
const formData = reactive({
  title: "",
  content: "",
  date: null,
});

const schema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Text is required"),
});

async function onSubmit(event) {
  event.preventDefault();
  loading.value = true;

  try {
    await $fetch("/api/events/event", {
      method: "POST",
      body: formData,
    });
    toast.add({
      title: "Great !!",
      description: "Event created successfully",
      color: "success",
    });
    await navigateTo("/");
  } catch (error) {
    if (error?.data?.data) {
      errors.value = error.data.data;
    } else {
      errors.value = [error.data.statusMessage || "An arror occurred. Please try again."];
    }
  } finally {
    loading.value = false;
  }
}

definePageMeta({
  middleware: ["auth-guard"],
});
</script>
