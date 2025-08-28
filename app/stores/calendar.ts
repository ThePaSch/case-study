import { defineStore } from "pinia";
import type { CalendarEvent } from "~/models/calendar-event";
import type { CalendarState } from "~/models/calendar-state";
import { addDays, format, parse, subDays } from "date-fns";
import type { AddEventResult } from "~/models/add-event-result";

export const useCalendarStore = defineStore("calendar", {
    state: (): CalendarState => ({
        events: {
            // pre-fill with example events for today
            [new Date().toISOString().slice(0, 10)]: [
                { title: "Team Standup", startTime: "10:00" },
                { title: "Project Sync", startTime: "14:30" },
            ],
        },
        selectedDate: new Date(),
    }),

    getters: {
        getEventsForDay(state) {
            return (date: Date): CalendarEvent[] => {
                const dateKey = format(date, "yyyy-MM-dd");

                if (!state.events[dateKey]) return [];

                return [...state.events[dateKey]].sort((a, b) =>
                    a.startTime.localeCompare(b.startTime)
                );
            };
        },
        dayHasEvents(state) {
            return (date: Date): boolean => {
                const key = format(date, "yyyy-MM-dd");
                return !!(state.events[key] && state.events[key].length > 0);
            };
        },
    },

    actions: {
        addEvent(payload: {
            date: Date;
            newEvent: CalendarEvent;
        }): AddEventResult {
            if (
                !payload.newEvent.title.trim() ||
                !payload.newEvent.startTime.trim()
            ) {
                return {
                    success: false,
                    message: "Title and start time cannot be empty.",
                };
            }

            const now = new Date();

            const timeRegex = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;

            if (!timeRegex.test(payload.newEvent.startTime)) {
                return {
                    success: false,
                    message: "Start time must be in HH:MM format.",
                };
            }

            if (
                parse(payload.newEvent.startTime, "HH:mm", payload.date) < now
            ) {
                return {
                    success: false,
                    message: "You cannot add an event to a past date.",
                };
            }

            const dateKey = format(payload.date, "yyyy-MM-dd");

            if (!this.events[dateKey]) {
                this.events[dateKey] = [];
            }

            this.events[dateKey].push(payload.newEvent);
            return { success: true, message: "Event added successfully." };
        },
        setCurrentDate(date: Date) {
            this.selectedDate = date;
        },
        gotoNextDay() {
            this.selectedDate = addDays(this.selectedDate, 1);
        },
        gotoPreviousDay() {
            this.selectedDate = subDays(this.selectedDate, 1);
        },
    },
});
