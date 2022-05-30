<script setup>
import { ref, onMounted } from 'vue'
import { useUsersStore } from '../../../../stores/users';
import Form from '../update/Form.vue';

let props = defineProps({
    userData: Array,
    search: String
})

const data = useUsersStore();

let temporaryUser = ref({})
let selectedUser = ref(null)
let openEdit = ref(false)
let msg = ref('Successfully delete user')
let invalid = ref({
    'name': false,
    'email': false,
    'phone': false,
})

function openEditUserForm(user) {
    temporaryUser.value = {
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'phone': user.phone,
        'role': user.role,
        'photo': user.photo,
    }

    openEdit.value = true;
}

function updateRole() {
    switch (temporaryUser.value.role) {
        case 'Web Developer':
            temporaryUser.value.photo = 'developer';
            break;
        case 'Copy Writer':
            temporaryUser.value.photo = 'writer';
            break;
        case 'Project Manager':
            temporaryUser.value.photo = 'manager';
            break;
        case 'Designer':
            temporaryUser.value.photo = 'designer';
            break;
    }
}
function updateUser() {
    let newUsers = [...data.realUsers]
    newUsers.forEach(value => {
        if (value.id == temporaryUser.value.id) {
            value.name = temporaryUser.value.name
            value.email = temporaryUser.value.email
            value.role = temporaryUser.value.role
            value.phone = temporaryUser.value.phone
            value.photo = temporaryUser.value.photo
        }
    })

    let searchUser = []
    newUsers.forEach(function (elem) {
        if (elem.name.toLowerCase().includes(props.search.toLowerCase())) {
            searchUser.push(elem)
        }
    });

    localStorage.setItem('employees', JSON.stringify(newUsers))
    data.$patch((state) => {
        state.users = [...searchUser];
        state.realUsers = [...newUsers];
    })

    openEdit.value = false;

    var alert = document.getElementById('alert');
    msg.value = 'Successfully update user';
    alert.classList.remove('hidden')
    setTimeout(() => {
        alert.classList.add('hidden')
    }, 3500)
}

function deleteUser() {
    var id = selectedUser.value
    let newUsers = [...data.realUsers]
    let temporaryUser = []
    newUsers.forEach(value => {
        if (value.id != id) {
            temporaryUser.push(value)
        }
    })

    let searchUser = []
    temporaryUser.forEach(function (elem) {
        if (elem.name.toLowerCase().includes(props.search.toLowerCase())) {
            searchUser.push(elem)
        }
    });

    localStorage.setItem('employees', JSON.stringify(temporaryUser))
    data.$patch((state) => {
        state.users = [...searchUser];
        state.realUsers = [...temporaryUser];
    })

    closeModal()

    var alert = document.getElementById('alert');
    msg.value = 'Successfully delete user';
    alert.classList.remove('hidden')
    setTimeout(() => {
        alert.classList.add('hidden')
    }, 3500)

}

function closeEdit() {
    openEdit.value = false;
}

function deletePopUp(id) {
    selectedUser.value = id
    var modal = document.getElementsByClassName('modal')[0];
    modal.style.opacity = 1
    modal.style.visibility = 'visible';
    modal.style.pointerEvents = "all";
}

function closeModal() {
    var modal = document.getElementsByClassName('modal')[0];

    modal.style.opacity = 0
    modal.style.visibility = 'hidden';

}

</script>
<template>
    <div class="alert alert-success shadow-lg w-3/12 right-[15px] absolute bottom-[15px] hidden" id="alert">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ msg }}</span>
        </div>
    </div>
    <div class="modal z-[100]">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Delete User!</h3>
            <p class="py-4">Are you sure want to delete this user?
            </p>
            <div class="modal-action">
                <div href="#"
                    class="h-[3rem] px-[1rem] bg-[#15074E] text-white rounded-[5px] flex items-center justify-center cursor-pointer"
                    @click="deleteUser">
                    Yes</div>
                <div href="#" class="h-[3rem] px-[1rem] flex items-center justify-center cursor-pointer cursor-pointer"
                    @click="closeModal">
                    Cancel</div>
            </div>
        </div>
    </div>
    <div class="w-full flex flex-wrap items-center mb-[1rem] bg-[#F9F9FC] cursor-pointer px-[0.5rem] lg:px-[1rem] py-[0.75rem] transition-all duration-300 rounded-[10px] list"
        v-for="(item, key) in data.users">
        <div class="basis-1/12 lg:basis-1/12 flex justify-start items-center">
            <img v-bind:src="'../../../src/assets/profile/' + item.photo + '.png'"
                class="w-[45px] lg:w-[60px] border-[1px] border-[#9CA1C5] rounded-[150px] border-solid " alt="">
        </div>
        <div class="basis-5/12 lg:basis-3/12 text-left text-[12px] pl-[1rem] lg:pl-[0rem]">
            <h3 class="text-[18px] lg:text-[22px] font-bold">
                {{ item.name }}
            </h3>
            <p class="text-[10px] lg:text-[12px] text-[#9693B2]">
                {{ item.role }}
            </p>
        </div>
        <div class="hidden lg:block basis-3/12 text-center text-[12px] text-[#5C61D4]">
            {{ item.email }}
        </div>
        <div class="hidden lg:block basis-4/12 text-center text-[12px] text-[#554E78]">
            {{ item.phone }}
        </div>
        <div class="basis-4/12 text-right block lg:hidden">
            <h3 class="text-[12px] ">
                {{ item.email }}
            </h3>
            <p class="text-[12px] text-[#9693B2]">
                {{ item.phone }}
            </p>
        </div>
        <div class="basis-1/12 text-center text-[12px] lg:block flex items-center justify-end dropdown dropdown-end "
            tabindex="0">
            <font-awesome-icon icon="ellipsis-v" class="text-[18px]" />
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li class="h-[40px] focus:bg-[#221360] active:bg-[#221360] focus:text-white active:text-white "
                    @click="openEditUserForm(item)"><a>edit</a></li>
                <li class="h-[40px] mt-[15px]" @click="deletePopUp(item.id)"><a
                        class="focus:bg-[#221360] active:bg-[#221360] focus:text-white active:text-white ">delete</a>
                </li>
            </ul>
        </div>

    </div>
    <Transition name="slide-fade">
        <div class="fixed right-0 w-full lg:w-[400px] h-full bg-white shadow-[0px_0px_2px_rgba(0,0,0,0.25)] right-0 top-0 flex items-center justify-center z-[100]"
            v-if="openEdit === true">
            <Form :invalid="invalid" :user="temporaryUser" @updateRole="updateRole" :newData="newData"
                @updateUser="updateUser" @closeEdit="closeEdit" />
        </div>
    </Transition>

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

.alert {
    animation: 2.5s alert ease;
    opacity: 0;
}

@keyframes alert {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

.list {
    animation: 0.4s fadeLeft ease;

}

@-webkit-keyframes fadeLeft {
    0% {
        opacity: 0;
        -webkit-transform: translateX(20px);
        -ms-transform: translateX(20px);
        transform: translateX(20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeLeft {
    0% {
        opacity: 0;
        -webkit-transform: translateX(20px);
        -ms-transform: translateX(20px);
        transform: translateX(20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>