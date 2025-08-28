<script setup lang="ts">
import { computed } from "vue";
import { useCalendarStore } from "~/stores/calendar";
import { storeToRefs } from "pinia";

import CalendarWidget from "./calendar-widget/CalendarWidget.vue";
import DayNavigation from "./events-view/DayNavigation.vue";
import EventsView from "./events-view/EventsView.vue";
import type { CalendarEvent } from "~/models/calendar-event";

const store = useCalendarStore();
const { selectedDate } = storeToRefs(store);
const eventsForDay = computed(() => store.getEventsForDay(selectedDate.value));
const dayHasEventsCheck = computed(() => store.dayHasEvents);

const handleDateSelect = (date: Date) => {
    store.setCurrentDate(date);
};

const handleAddEvent = (title: string, startTime: string) => {
    const event: CalendarEvent = {
        title: title,
        startTime: startTime,
    };
    return store.addEvent({ date: selectedDate.value, newEvent: event });
};
</script>

<template>
    <main class="app-container">
        <div class="main-content">
            <CalendarWidget
                :selected-date="selectedDate"
                :date-has-event="dayHasEventsCheck"
                @date-select="(date: Date) => handleDateSelect(date)"
            />
            <div class="events-panel">
                <DayNavigation
                    :current-date="selectedDate"
                    @update-current-date="
                        (date: Date) => handleDateSelect(date)
                    "
                />
                <EventsView
                    :events="eventsForDay"
                    :selected-date="selectedDate"
                    :add-event="
                        (title: string, time: string) =>
                            handleAddEvent(title, time)
                    "
                />
            </div>
        </div>
    </main>
</template>

<style>
body {
    font-family: "Roboto";
    background-color: #f9fafb;
    margin: 0;
}

.app-container {
    display: flex;
    justify-content: center;
    padding: 2rem;
}

.main-content {
    display: grid;
    grid-template-columns: 350px 1fr;
    max-width: 900px;
    width: 100%;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow:
        0 4px 6px -1px rgb(0 0 0 / 0.1),
        0 2px 4px -2px rgb(0 0 0 / 0.1);
}
</style>
