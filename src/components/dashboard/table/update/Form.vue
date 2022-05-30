<script setup>
import { ref } from 'vue'
let props = defineProps({
    user: Object,
    invalid: Object
})

</script>
<template>
    <div class="w-[300px] pr-[12px]">
        <div class="flex items-center">
            <font-awesome-icon icon="chevron-left" class="text-[14px] font-bold" />
            <p class="text-[12px] cursor-pointer ml-[3px] leading-[14px] " @click="$emit('closeEdit')">
                back
            </p>
        </div>
        <h3 class="text-[28px] font-semibold mt-[10px] lg:mt-[50px] leading-[35px]">Edit Employee</h3>
        <p class="text-[12px] text-[#9088AE]">edit employee information</p>

        <div class="my-[3rem]">
            <div
                class="w-[130px] h-[130px] border-[1px] border-[#9CA1C5] rounded-[130px] border-solid flex items-center justify-center mx-auto">
                <img v-bind:src="'../../src/assets/profile/' + user.photo + '.png'" class="w-[130px] mx-auto" />
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
            <select v-model="user.role"
                class="pl-[1px] pt-[10px] w-full h-[46px] border-[1px] border-[#E1E1EC] outline-[#15074E] bg-white"
                @change="$emit('updateRole')">
                <option value="Web Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Copy Writer">Copy Writer</option>
            </select>
        </div>

        <button class="w-full bg-[#15074E] text-white h-[40px] rounded-[5px] text-[12px] mt-[1rem]"
            @click="$emit('updateUser')">Edit
            Employee</button>
    </div>
</template>