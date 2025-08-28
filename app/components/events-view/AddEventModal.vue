<script setup lang="ts">
import { ref, watch } from "vue";
import { format } from "date-fns";

const props = defineProps<{
    show: boolean;
    eventDate: Date;
    error?: string;
}>();

const emit = defineEmits<{
    (e: "close"): void;
    (e: "save", title: string, time: string): void;
}>();

const title = ref("");
const time = ref("");

watch(
    () => props.show,
    (isShown) => {
        if (isShown) {
            title.value = "";
            const nextHour = new Date().getHours() + (1 % 24);
            time.value = `${String(nextHour).padStart(2, "0")}:00`;
        }
    }
);

const handleSave = () => {
    emit("save", title.value, time.value);
};

const handleClose = () => {
    emit("close");
};
</script>

<template>
    <div v-if="show" class="modal-overlay" @click.self="() => handleClose()">
        <div class="modal-content">
            <h3>Add Event for {{ format(eventDate, "MMMM d") }}</h3>
            <form @submit.prevent="() => handleSave()">
                <div class="form-group">
                    <label for="event-title">Event Description</label>
                    <input
                        id="event-title"
                        v-model="title"
                        type="text"
                        placeholder="e.g. Daily Standup"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="event-time">Time</label>
                    <input
                        id="event-time"
                        v-model="time"
                        type="time"
                        required
                    />
                </div>
                <p v-if="props.error" class="error-message">{{ error }}</p>
                <div class="modal-actions">
                    <button
                        type="button"
                        class="btn-secondary"
                        @click="() => handleClose()"
                    >
                        Cancel
                    </button>
                    <button type="submit" class="btn-primary">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 0.5rem;
    width: 40%;
    min-width: 300px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.3rem;
    box-sizing: border-box;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 2rem;
}

button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    font-weight: 600;
}

.btn-primary {
    background-color: #3b82f6;
    color: white;
}

.btn-secondary {
    background-color: #e5e7eb;
    color: #374151;
}

.error-message {
    color: #d93025;
    text-align: center;
    margin-top: 1rem;
}
</style>
