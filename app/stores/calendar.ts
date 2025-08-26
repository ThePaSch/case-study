import { defineStore } from "pinia";
import type { CalendarEvent } from "~/models/calendar-event";
import type { CalendarState } from "~/models/calendar-state";
import { format } from "date-fns";

export const useCalendarStore = defineStore("calendar", {
    state: (): CalendarState => ({
        events: {
            // pre-fill with example events for today
            [new Date().toISOString().slice(0, 10)]: [
                { title: "Team Standup", startTime: "10:00" },
                { title: "Project Sync", startTime: "14:30" },
            ],
        },
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
    },

    actions: {
        addEvent(payload: { date: Date; newEvent: CalendarEvent }): {
            success: boolean;
            message: string;
        } {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const timeRegex = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;

            if (!timeRegex.test(payload.newEvent.startTime)) {
                return {
                    success: false,
                    message: "Start time must be in HH:MM format.",
                };
            }

            if (payload.date < today) {
                console.error("Cannot add an event to a past date.");
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
    },
});
