import type { CalendarEvent } from "./calendar-event";

export interface CalendarState {
    events: Record<string, CalendarEvent[]>;
}
