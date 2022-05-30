<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'

import { useUsersStore } from '../../../../stores/users';
import Form from '../update/Form.vue';



const data = useUsersStore();
let props = defineProps({
    userData: Array,
    search: String
})
let msg = ref('Successfully delete user')
let selectedUser = ref(null)
let temporaryUser = ref({})
let openEdit = ref(false)
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
    validateUser()
    if (invalid.value.name == false && invalid.value.email == false && invalid.value.phone == false) {

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
        if (props.search != '') {
            newUsers.forEach(function (elem) {
                if (elem.name.toLowerCase().includes(props.search.toLowerCase())) {
                    searchUser.push(elem)
                }
            });
        } else {
            searchUser = [...newUsers]
        }

        localStorage.setItem('employees', JSON.stringify(newUsers))
        data.$patch((state) => {
            state.users = [...searchUser];
            state.realUsers = [...newUsers];
        })

        openEdit.value = false;

        var alert = document.getElementById('alert');
        msg.value = 'Successfully delete user';
        alert.classList.remove('hidden')
        setTimeout(() => {
            alert.classList.add('hidden')
        }, 3500)

    }
}

function validateUser() {
    invalid.value.email = !validateEmail(temporaryUser.value.email);
    invalid.value.name = temporaryUser.value.name == '' ? true : false;
    invalid.value.phone = !validatePhoneNumber(temporaryUser.value.phone);
}

function validateEmail(email) {
    if (email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
        return true;
    } else {
        return false
    }
};

function validatePhoneNumber(phoneNumber) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phoneNumber);
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
    <div class="grid grid-cols-2 lg:grid-cols-4 w-full gap-x-4 pt-[0rem] transition-all duration-300">
        <div class=" flex items-center justify-center box" v-for="(item, index) in userData">
            <div
                class="relative mb-[1rem] hover:bg-white hover:scale-[1.02] hover:shadow-[2px_2px_5px_1px_rgba(0,0,0,0.07)] bg-[#F9F9FC] cursor-pointer w-full h-[250px] lg:h-[300px] rounded-[10px]">
                <img v-bind:src="'../../../src/assets/profile/' + item.photo + '.png'"
                    class="w-[90px] lg:w-[130px] mx-auto mt-[30px] mb-[20px] border-[1px] border-[#9CA1C5] rounded-[130px] border-solid "
                    alt="">
                <h3 class="font-semibold text-center text-[24px]">
                    {{ item.name }}
                </h3>
                <div
                    class="text-center rounded-[10px] flex items-center justify-center text-[#9693B2] text-[12px] mb-[10px]">
                    {{ item.role }}
                </div>
                <div class="flex justify-center flex-wrap gap-2 mt-[20px]">
                    <div class="basis-5/12 flex justify-end items-center pr-[5px]">
                        <div class=" tooltip tooltip-bottom" :data-tip="item.phone">
                            <font-awesome-icon icon="phone" class="text-[#B7BCD9] hover:text-[#15074E]" />
                        </div>

                    </div>
                    <div class="basis-5/12 flex justify-start items-center pl-[5px]">
                        <div class=" tooltip tooltip-bottom" :data-tip="item.email">
                            <font-awesome-icon icon="paper-plane" class="text-[#B7BCD9] hover:text-[#15074E]" />
                        </div>
                    </div>
                </div>
                <div class="absolute top-[14px] right-[14px] dropdown dropdown-end">
                    <font-awesome-icon icon="ellipsis-v" tabindex="0" class="" />
                    <ul tabindex="0"
                        class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-[120px] px-[0.5rem] py-[1rem] h-[130px]">
                        <li class="h-[40px] focus:bg-[#221360] active:bg-[#221360] focus:text-white active:text-white "
                            @click="openEditUserForm(item)"><a>edit</a></li>
                        <li class="h-[40px] mt-[15px]" @click="deletePopUp(item.id)"><a
                                class="focus:bg-[#221360] active:bg-[#221360] focus:text-white active:text-white ">delete</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <Transition name="slide-fade">
        <div class="fixed right-0 w-full lg:w-[400px] h-full bg-white shadow-[0px_0px_2px_rgba(0,0,0,0.25)] right-0 top-0 flex items-center justify-center z-[10]"
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
    animation: 4s alert ease;
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

.box {
    animation: 0.4s fadeUp ease;
    -webkit-transform: translateY(20px);
    -ms-transform: translateY(20px);
    transform: translateY(20px);
}

@-webkit-keyframes fadeUp {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeUp {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>