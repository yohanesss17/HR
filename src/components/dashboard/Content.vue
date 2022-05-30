<script setup>
import Table from './table/Table.vue'
import { useUsersStore } from '../../stores/users';

const data = useUsersStore();

defineProps({
    open: Boolean
})

function countDivision(division) {

    return data.users == null ? 0 : data.users.filter(e => e.photo === division).length;
}

</script>
<template>
    <div class="w-full flex flex-wrap">
        <div class="lg:h-50px basis-full lg:basis-6/12 text-[16px] lg:text-[24px] flex items-center mt-[10px] lg:mt-[0px]">
            <h3 class="font-bold text-[#9CA1C5]">{{ data.users != null ? data.users.length : 0}} Employee </h3>
        </div>
        <div class="basis-full lg:basis-6/12 flex justify-end my-[12px]">
            <div
                class="bg-[#F9F9FC] w-full lg:w-[400px] h-[70px] rounded-[10px] shadow-[0px_0px_1px_rgba(0,0,0,0.25)] flex flex-wrap items-center">
                <div class="basis-3/12 border-r-[1px] border-[#E1E1EC]">
                    <h3
                        class="text-center text-[#B7BCD9] leading-[15px] lg:leading-[16px] text-[12px] font-bold h-[35px] flex items-center justify-center">
                        Project <br /> Manager</h3>
                    <p class="text-center font-semibold text-[16px] lg:text-[12px]">
                        {{ countDivision('manager') }}
                    </p>
                </div>
                <div class="basis-3/12 border-r-[1px] border-[#E1E1EC]">
                    <h3
                        class="text-center text-[#B7BCD9] leading-[15px] lg:leading-[16px] text-[12px] font-bold h-[35px] flex items-center justify-center">
                        Web <br /> Developer</h3>
                    <p class="text-center font-semibold text-[16px] lg:text-[12px]">
                        {{ countDivision('developer') }}
                    </p>
                </div>
                <div class="basis-3/12 border-r-[1px] border-[#E1E1EC]">
                    <h3
                        class="text-center text-[#B7BCD9] leading-[15px] lg:leading-[16px] text-[12px] font-bold h-[35px] flex items-center justify-center">
                        Designer</h3>
                    <p class="text-center font-semibold text-[16px] lg:text-[12px]">
                        {{ countDivision('designer') }}
                    </p>
                </div>
                <div class="basis-3/12">
                    <h3
                        class="text-center text-[#B7BCD9] leading-[15px] lg:leading-[16px] text-[12px] font-bold h-[35px] flex items-center justify-center">
                        Copy <br /> Writer</h3>
                    <p class="text-center font-semibold text-[16px] lg:text-[12px]">
                        {{ countDivision('writer') }}
                    </p>
                </div>
            </div>
        </div>
        
        <Table />
    </div>
</template>