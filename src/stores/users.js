import { defineStore } from "pinia";

export const useUsersStore = defineStore({
    id: "users",
    state: () => ({
        users: JSON.parse(localStorage.getItem('employees')),
        realUsers: JSON.parse(localStorage.getItem('employees'))
    })
})