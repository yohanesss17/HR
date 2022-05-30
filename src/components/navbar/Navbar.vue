<template>
    <div class="
      bg-[#15074E]
      h-[60px]
      lg:h-[64px]
      rounded-[10px]
      w-full
      mt-[15px]
    ">
        <div class="
        h-[55px] lg:h-full
        mx-auto
        px-3
      ">
            <div class="basis-full flex items-center">
                <div class="basis-6/12 flex items-center">
                    <div>
                        <img src="../../assets/icon/profile.png" class="w-[30px] lg:w-[45px]" alt="profile">
                    </div>
                    <div class="pl-[8px] lg:pl-[10px]">
                        <h4 class="text-[#FDFDFD] text-[14px] lg:text-[16px] font-bold">Cameron Lane</h4>
                        <p class="text-[#9088AE] text-[12px] lg:text-[14px]">HR-manager</p>
                    </div>
                </div>

                <div class="basis-6/12 flex justify-end my-[12px] items-center ">
                    <div @click="$emit('openCreate', !open)"
                        class="w-[130px] lg:w-[150px] h-[35px] rounded-[10px] bg-[#221360] flex items-center justify-center shadow-[0px_0px_1px_rgba(0,0,0,0.25)] cursor-pointer">
                        <p class="text-white text-[10px] lg:text-[12px] text-[#FFFFFF]">Add new employee</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// import { inject } from 'vue';
// const toggle = inject('toggle');
</script>