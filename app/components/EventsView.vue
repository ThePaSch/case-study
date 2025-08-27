<script setup lang="ts">
import type { PropType } from "vue";
import type { CalendarEvent } from "~/models/calendar-event";

const props = defineProps<{
    events: CalendarEvent[];
}>();
</script>

<template>
    <div class="event-list-container">
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
</style>
