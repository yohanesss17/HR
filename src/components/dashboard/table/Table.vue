<script setup>
import { ref, watch } from 'vue'
import Empty from './empty/Empty.vue'
import Card from './card/Card.vue';
import List from './list/List.vue';
import { useUsersStore } from '../../../stores/users';

const data = useUsersStore();

let menu = ref('card');
let search = ref('');

function changeMenu(value) {
    menu.value = value;
}

function searchFor(toSearch) {
    var results = [];
    toSearch = trimString(toSearch); // trim it
    for (var i = 0; i < data.users.length; i++) {
        for (var key in data.users[i]) {
            if (data.users[i][key].indexOf(toSearch) != -1) {
                if (!itemExists(results, objects[i])) results.push(objects[i]);
            }
        }
    }
    return results;
}

watch(search, (newSearch) => {
    data.$patch((state) => {
        state.users = [...data.realUsers];
    })

    let temp = []
    data.users.forEach(function (elem) {
        if (elem.name.toLowerCase().includes(newSearch.toLowerCase())) {
            temp.push(elem)
        }

    });

    data.$patch((state) => {
        state.users = temp;
    })

})

</script>
<template>
    <div class="basis-full border-t-[3px] border-solid border-[#F9F9FC] flex flex-wrap">
        <div class="basis-full mt-[12px]">
            <div
                class=" rounded-[10px] bg-[#F9F9FC] h-[60px] flex flex-wrap items-center px-[10px] shadow-[0px_0px_1px_rgba(0,0,0,0.25)]">
                <div class="basis-8/12 lg:basis-3/12">
                    <input type="text"
                        class="bg-white rounded-[10px] w-full outline-none h-[40px] px-[15px] text-[#E5E2E6] border-[1px] border-[#E1E1EC] "
                        placeholder="Search by name" v-model="search" />
                </div>
                <div class="basis-4/12 lg:basis-9/12 flex justify-end pr-[1rem]">
                    <div class="mr-[15px] w-[25px] h-[25px] flex justify-center items-center rounded-[5px] transition-all duration-300"
                        :class="[menu === 'card' ? 'bg-[#EBE9F4]' : '']">
                        <img src="../../../assets/icon/grid.png" class="w-[19px] cursor-pointer"
                            @click="changeMenu('card')" alt="">
                    </div>
                    <div class="w-[25px] h-[25px] flex justify-center items-center rounded-[5px] transition-all duration-300"
                        :class="[menu === 'list' ? 'bg-[#EBE9F4]' : '']">
                        <img src="../../../assets/icon/list.png" class="w-[19px] cursor-pointer"
                            @click="changeMenu('list')" alt="">
                    </div>
                </div>
            </div>
        </div>

        <div class="basis-full lg:mt-[20px] px-[1rem] py-[0.75rem] h-[350px] lg:h-[450px] flex items-center justify-center rounded-[10px]"
            v-if="data.users == null">
            <Empty />
        </div>

        <div class="overflow-auto w-full h-[600px] lg:pr-[0.4rem] mt-[1rem] table-section" v-else>
            <Card :userData="data.users" :search="search" v-if="menu === 'card'" />
            <List :userData="data.users" :search="search" v-else />
        </div>
    </div>

</template>
<style scoped>
.table-section::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #F5F5F5;
}

.table-section::-webkit-scrollbar {
    width: 10px;
    background-color: #F5F5F5;
}

.table-section::-webkit-scrollbar-thumb {
    margin-left: 100px;
    background-color: #F5F6FB;
    border: 2px solid #F5F6FB;
}
</style>