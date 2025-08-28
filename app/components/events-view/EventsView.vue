<script setup lang="ts">
import { isPast, isToday } from "date-fns";
import type { PropType } from "vue";
import type { AddEventResult } from "~/models/add-event-result";
import type { CalendarEvent } from "~/models/calendar-event";
import AddEventModal from "./AddEventModal.vue";

const props = defineProps<{
    selectedDate: Date;
    events: CalendarEvent[];
    addEvent: (title: string, time: string) => AddEventResult;
}>();

const saveModalVisible = ref(false);
const saveErrorMessage = ref("");

const canAddEvent = () => {
    return !isPast(props.selectedDate) || isToday(props.selectedDate);
};

const handleSaveEvent = (title: string, time: string) => {
    saveErrorMessage.value = "";
    const result = props.addEvent(title, time);

    if (!result.success) {
        saveErrorMessage.value = result.message;
        return;
    }
    saveModalVisible.value = false;
};

const openModal = () => {
    saveErrorMessage.value = "";
    saveModalVisible.value = true;
};
</script>

<template>
    <div class="event-list-container">
        <div class="event-list-main">
            <div v-if="props.events.length > 0">
                <ul class="event-list">
                    <li
                        v-for="event in events"
                        :key="event.startTime"
                        class="event-item"
                    >
                        <span class="event-time">{{ event.startTime }}</span>
                        <span class="event-title">{{ event.title }}</span>
                    </li>
                </ul>
            </div>
            <div v-else class="no-events">
                <p>No events scheduled for this day.</p>
            </div>
        </div>
        <div class="event-list-footer">
            <button
                v-if="canAddEvent()"
                class="btn-add-event"
                @click="openModal"
            >
                + Add Event
            </button>
        </div>
    </div>
    <AddEventModal
        :show="saveModalVisible"
        :event-date="props.selectedDate"
        :error="saveErrorMessage"
        @close="() => (saveModalVisible = false)"
        @save="(title: string, time: string) => handleSaveEvent(title, time)"
    />
</template>

<style scoped>
.event-list {
    padding: 0;
}

.event-item {
    display: flex;
    align-items: center;
    margin: 0rem 1.5rem;
    padding: 1rem;
    border-bottom: 1px solid #999999;
}

.event-item:last-child {
    border-bottom: none;
}

.event-time {
    font-weight: 600;
    width: 5rem;
}

.no-events {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #6b7280;
    font-style: italic;
}

.event-list-container {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.event-list-content {
    flex-grow: 1;
}

.event-list-footer {
    padding-top: 1rem;
    border-top: 1px solid #f3f4f6;
    text-align: center;
}

.btn-add-event {
    width: 100%;
    padding: 0.75rem;
    font-weight: 600;
    color: #3b82f6;
    background-color: #eff6ff;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
}
</style>
