<script setup>
import { ref } from 'vue'
import { useUsersStore } from '../../stores/users';
import Form from '../form/Form.vue';

let props = defineProps({
    open: Boolean,
})
let emit = defineEmits(['closeCreate'])

let invalid = ref({
    'name': false,
    'email': false,
    'phone': false,
})
let user = ref({
    'id': '',
    'name': '',
    'email': '',
    'phone': '',
    'role': 'Web Developer',
    'photo': 'developer'
})
let msg = ref('')
const data = useUsersStore();

function submitUser() {
    validateUser()
    if (invalid.value.name == false && invalid.value.email == false && invalid.value.phone == false) {
        let newUser = {
            id: uuidv4(),
            name: user.value.name,
            email: user.value.email,
            phone: user.value.phone,
            role: user.value.role,
            photo: user.value.photo
        }
        let newData = data.users != null ? [...data.users] : [];
        newData.push(newUser);
        data.$patch((state) => {
            state.users = [...newData];
        })
        localStorage.setItem('employees', JSON.stringify(newData))

        var alert = document.getElementById('alert');
        msg.value = 'Successfully create user';
        alert.classList.remove('hidden')
        setTimeout(() => {
            alert.classList.add('hidden')
        }, 3500)

        emit('closeCreate')
    }
}

function validateUser() {
    invalid.value.email = !validateEmail(user.value.email);
    invalid.value.name = user.value.name == '' ? true : false;
    invalid.value.phone = !validatePhoneNumber(user.value.phone);
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

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
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
    <div class="fixed right-0 w-full lg:w-[400px] h-full bg-white shadow-[0px_0px_2px_rgba(0,0,0,0.25)] flex items-center justify-center"
        v-if="open == true">
        <div class="w-[300px] pr-[12px]">
            <div class="flex items-center">
                <font-awesome-icon icon="chevron-left" class="text-[14px] font-bold" />
                <p class="text-[12px] cursor-pointer ml-[3px] leading-[14px] mt-[1px] lg:-mt-[3px]"
                    @click="$emit('closeCreate')">
                    back
                </p>
            </div>

            <h3 class="text-[28px] font-semibold mt-[10px] lg:mt-[50px] leading-[35px]">Create Employee</h3>
            <p class="text-[12px] text-[#9088AE]">fill employee information</p>
            <Form :user="user" :invalid="invalid" />
            <button class="w-full bg-[#15074E] text-white h-[40px] rounded-[5px] text-[12px] mt-[1rem]"
                @click="submitUser">Create
                Employee</button>
        </div>
    </div>
</template>

<style>
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
</style>