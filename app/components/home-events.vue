<template>
  <div v-if="status === 'pending'" class="flex justify-center items-center min-h-screen">
    <span>Loading events...</span>
  </div>
  <div v-else-if="error" class="flex justify-center items-center min-h-screen">
    <span class="text-red-500">Error: {{ error.statusMessage }}</span>
  </div>
  <!-- Masonry layout -->
  <div v-else class="columns-1 md:columns-2 lg:columns-3 xl:columns-2 gap-4 space-y-4 mt-7">
    <UCard
      v-for="event in events"
      :key="event._id"
      class="break-inside-avoid mb-4 hover:shadow-lg transition-shadow duration-300"
      :ui="{
        body: { padding: 'p-4' },
        header: { padding: 'px-4 py-3' },
      }"
    >
      <template #header>
        <div class="flex items-start justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
            {{ event.title }}
          </h3>
        </div>
      </template>

      <div class="space-y-3">
        <!-- Description -->
        <p class="text-gray-600 dark:text-gray-300 text-sm">{{ event.content }}</p>

        <!-- Date and Location -->
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <UIcon name="i-heroicons-calendar-days" />
            <span v-if="event.date !== null">
              {{ event.date.day }}/{{ event.date.month }}/{{ event.date.year }}</span
            >
            <span v-else> No date set </span>
          </div>
        </div>

        <!-- Status Badge -->
        <div>
          <span
            v-if="event.status === 'completed'"
            class="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
          >
            Completed
          </span>
          <span
            v-else
            class="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full"
          >
            Pending
          </span>
        </div>
        <div class="flex items-center gap-2 mt-4">
          <UButton
            v-if="event.status === 'pending'"
            variant="outline"
            size="xs"
            @click="completeEvent(event._id, 'complete')"
            >Complete and archive</UButton
          >
          <UButton
            v-if="event.status === 'completed'"
            variant="outline"
            size="xs"
            @click="completeEvent(event._id, 'delete')"
            color="error"
            >Delete</UButton
          >
        </div>
      </div>
    </UCard>
  </div>
  <div>
    <p v-if="events?.length === 0" class="text-center mt-10">No events found.</p>
  </div>
</template>

<script setup>
const { data: events, error, status, refresh } = await useFetch("/api/events/event");
const toast = useToast();

const completeEvent = async (eventId, action) => {
  try {
    await $fetch("/api/events/event", {
      method: "DELETE",
      body: {
        id: eventId,
        action: action,
      },
    });
    await refresh();
  } catch (error) {
    toast.add({
      title: "Ooops",
      description: error.data?.statusMessage || "Sorry, something happened",
      color: "error",
    });
  }
};
</script>
