<script setup>
import { ref } from 'vue'
let props = defineProps({
    user: Object,
    invalid: Object
})


function changeRole() {
    switch (props.user.role) {
        case 'Web Developer':
            props.user.photo = 'developer';
            break;
        case 'Copy Writer':
            props.user.photo = 'writer';
            break;
        case 'Project Manager':
            props.user.photo = 'manager';
            break;
        case 'Designer':
            props.user.photo = 'designer';
            break;
    }
}
</script>
<template>
    <div class="my-[3rem]">
        <div
            class="w-[130px] h-[130px] border-[1px] border-[#9CA1C5] rounded-[130px] border-solid flex items-center justify-center mx-auto">
            <img v-bind:src="'../../src/assets/profile/' + props.user.photo + '.png'" class="w-[130px] mx-auto" />
        </div>
    </div>
    <div class="my-[1rem] relative">
        <label class="text-[12px] text-[#9088AE] font-normal absolute left-[6px] top-[2px]">Name</label>
        <input type="text" v-model="props.user.name"
            class="pl-[6px] pt-[10px] w-full h-[46px] border-[1px] border-[#E1E1EC] outline-[#15074E]"
            :class="[props.invalid.name === true ? 'border-[#ED4337]' : 'border-[#E1E1EC]']">
        <span v-if="props.invalid.name === true" class="text-[12px] text-[#ED4337]"> Invalid name </span>
    </div>

    <div class="my-[1rem] relative">
        <label class="text-[12px] text-[#9088AE] font-normal absolute left-[6px] top-[2px]">Email</label>
        <input type="email" v-model="props.user.email"
            class="pl-[6px] pt-[10px] w-full h-[46px] border-[1px] border-[#E1E1EC] outline-[#15074E]"
            :class="[props.invalid.email === true ? 'border-[#ED4337]' : 'border-[#E1E1EC]']">
        <span v-if="props.invalid.name === true" class="text-[12px] text-[#ED4337]"> Invalid email </span>

    </div>

    <div class="my-[1rem] relative">
        <label class="text-[12px] text-[#9088AE] font-normal absolute left-[6px] top-[2px]">Phone</label>
        <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" v-model="props.user.phone"
            class="pl-[6px] pt-[10px] w-full h-[46px] border-[1px] border-[#E1E1EC] outline-[#15074E]"
            :class="[props.invalid.phone === true ? 'border-[#ED4337]' : 'border-[#E1E1EC]']">
        <span v-if="props.invalid.phone === true" class="text-[12px] text-[#ED4337]"> Invalid phone </span>

    </div>

    <div class="my-[1rem] relative">
        <label class="text-[12px] text-[#9088AE] font-normal absolute left-[6px] top-[2px]">Role</label>
        <select v-model="props.user.role"
            class="pl-[1px] pt-[10px] w-full h-[46px] border-[1px] border-[#E1E1EC] outline-[#15074E] bg-white"
            @change="changeRole">
            <option value="Web Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Copy Writer">Copy Writer</option>
        </select>
    </div>
</template>