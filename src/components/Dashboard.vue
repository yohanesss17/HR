<script setup>
import { ref } from 'vue'

import Sidebar from './sidebar/Sidebar.vue';
import Navbar from './navbar/Navbar.vue'
import Content from './dashboard/Content.vue'
import CreateUser from './create/CreateUser.vue'

let open = ref(false);

function changeOpenValue(value) {
    open.value = value;
}

function closeCreate() {
    open.value = false;
}

</script>
<template>
    <div class="h-screen overflow-hidden">
        <div class="flex items-start">
            <Sidebar />
            <div class="flex flex-col h-screen pl-[1rem] lg:pl-[2rem] pr-[1rem] lg:pr-[2rem] lg:space-y-4 container mx-auto">
                <Navbar :open="this.open" @openCreate="changeOpenValue" />
                <Content :open="this.open" @openCreate="changeOpenValue" />
            </div>
            <Transition name="slide-fade">
                <CreateUser :open="open" @closeCreate="closeCreate" />
            </Transition>
        </div>
    </div>

</template>
<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

</style>