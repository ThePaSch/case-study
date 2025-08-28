<script setup lang="ts">
import { computed } from "vue";
import { getDate, isToday, isSameDay } from "date-fns";

const props = defineProps<{
    dayDate: Date;
    selectedDate: Date;
    hasEvent: boolean;
}>();

const emit = defineEmits<{
    (e: "select", date: Date): void;
}>();

const dayNumber = computed(() => getDate(props.dayDate));

const handleClick = () => {
    emit("select", props.dayDate);
};
</script>

<template>
    <div
        class="calendar-day"
        :class="{
            today: isToday(dayDate),
            selected: isSameDay(dayDate, selectedDate),
        }"
        @click="() => handleClick()"
    >
        <span>{{ dayNumber }}</span>
        <div v-if="hasEvent" class="event-dot"></div>
    </div>
</template>

<style scoped>
.calendar-day {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    border-radius: 10%;
    cursor: pointer;
    position: relative;
    transition:
        background-color 0.2s,
        color 0.2s;
}

.calendar-day:hover {
    background-color: #eff6ff;
    color: #1d4ed8;
}

.calendar-day.today {
    font-weight: 700;
    color: #1d4ed8;
}

.calendar-day.selected {
    background-color: #3b82f6;
    color: white;
}

.event-dot {
    position: absolute;
    bottom: 10%;
    width: 0.4rem;
    height: 0.4rem;
    background-color: #3b82f6;
    border-radius: 50%;
}
</style>
