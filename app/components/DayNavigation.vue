<script setup lang="ts">
import { computed } from "vue";
import { format, subDays, addDays } from "date-fns";

const props = defineProps<{
    currentDate: Date;
}>();

const emit = defineEmits<{
    (e: "updateCurrentDate", value: Date): void;
}>();

const previousDay = computed(() => subDays(props.currentDate, 1));
const nextDay = computed(() => addDays(props.currentDate, 1));

const handlePreviousDayClick = () => {
    emit("updateCurrentDate", previousDay.value);
};

const handleNextDayClick = () => {
    emit("updateCurrentDate", nextDay.value);
};
</script>

<template>
    <nav class="day-navigator">
        <button @click="() => handlePreviousDayClick()">
            &larr; {{ format(previousDay, "MMM d") }}
        </button>
        <h2 class="current-date">
            {{ format(props.currentDate, "MMMM d, yyyy") }}
        </h2>
        <button @click="() => handleNextDayClick()">
            {{ format(nextDay, "MMM d") }} &rarr;
        </button>
    </nav>
</template>

<style scoped>
.day-navigator {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
}

.current-date {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
}

button {
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 10%;
    font-size: 0.875rem;
    color: #374151;
    cursor: pointer;
}
</style>
