<script setup lang="ts">
import { ref, watch, computed } from "vue";
import {
    getDaysInMonth,
    startOfMonth,
    format,
    setDate,
    addMonths,
    subMonths,
} from "date-fns";
import CalendarDaySquare from "./CalendarDaySquare.vue";

const props = defineProps<{
    selectedDate: Date;
    dateHasEvent: (date: Date) => boolean;
}>();

const emit = defineEmits<{
    (e: "date-select", date: Date): void;
}>();

const viewDate = ref(new Date(props.selectedDate));

watch(
    () => props.selectedDate,
    (newDate) => {
        viewDate.value = new Date(newDate);
    }
);

const goToNextMonth = () => {
    viewDate.value = addMonths(viewDate.value, 1);
};

const goToPreviousMonth = () => {
    viewDate.value = subMonths(viewDate.value, 1);
};

const gotoDate = (date: Date) => {
    emit("date-select", date);
};

const daysInMonth = computed(() => getDaysInMonth(viewDate.value));
const monthStartDay = computed(
    () => (startOfMonth(viewDate.value).getDay() + 6) % 7
);

const getDayDate = (day: number): Date => {
    return setDate(viewDate.value, day);
};
</script>

<template>
    <div class="calendar-container">
        <div class="month-header">
            <button @click="() => goToPreviousMonth()" class="nav-button">
                &lt;
            </button>
            <span>{{ format(viewDate, "MMMM yyyy") }}</span>
            <button @click="() => goToNextMonth()" class="nav-button">
                &gt;
            </button>
        </div>

        <div class="calendar-grid">
            <div v-for="pad in monthStartDay" class="calendar-day empty"></div>
            <CalendarDaySquare
                v-for="day in daysInMonth"
                :day-date="getDayDate(day)"
                :selected-date="selectedDate"
                :has-event="dateHasEvent(getDayDate(day))"
                @select="(date: Date) => gotoDate(date)"
            />
        </div>
    </div>
</template>

<style scoped>
.calendar-container {
    padding: 1.5rem;
    border-right: 1px solid #e5e7eb;
}

.month-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.125rem;
    font-weight: 600;
}

.nav-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
    padding: 0.5rem;
    transition:
        background-color 0.2s,
        color 0.2s;
}

.nav-button:hover {
    background-color: #f3f4f6;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
}
</style>
