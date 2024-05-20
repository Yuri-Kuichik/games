<script setup>
import {ref} from 'vue'
import { useForm } from 'vee-validate';
import FormInput from '@/components/FormInput.vue'

const isPassword = (val) => {
    return !val ? 'Input your passowrd' 
                : val.length < 5 ? 'Password too short' 
                    : true
}

const { handleSubmit, errors } = useForm({
  validationSchema: {
    userName: val => (!!val || 'Input your name'),
    password: val => isPassword(val)
  },
})

const userName = ref('richard')
const password = ref('poker')
const passwordFieldType = ref('password')

const switchVisibilityPassword = () => {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
}

const submitForm = () => {
    console.log('User name: ', userName.value)
    console.log('password: ', password.value)
}

const onSubmit = handleSubmit(values => {
    console.log('values: ', values)
    alert(JSON.stringify(values, null, 2));
});

</script>

<template>
    <div class="login">
        <div class="login__form-wrapper">

            <form @submit="onSubmit">
                <h1>Log In</h1>

                <FormInput
                    class="login__input"
                    name="userName"
                    label="User name"
                    :error="errors.userName"
                />
                <FormInput
                    class="login__input"
                    name="password"
                    label="Password"
                    password-field
                    :type="passwordFieldType"
                    @switchType="switchVisibilityPassword"
                    :error="errors.password"
                />

                <button class="login__btn">
                    <span>Submit</span>
                </button>
            </form>
        </div>
    </div>
</template>

<style lang="scss">
.login {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

    &__form-wrapper {
        display: inline-flex;
        flex-grow: 1;
        max-width: 480px;
    }

    form {
        padding: 24px;
        width: 100%;
        background-color: var(--color-background);
        border-radius: 12px;
    }

    &__input {
        margin-top: 20px;
    }

    &__btn {
        padding: 16px 32px;
        margin-top: 32px;
        background: var(--color-primary);
        color: var(--color-white);
        border-radius: 8px;
        font-size: 16px;
        line-height: 24px;
        font-weight: 600;
        width: 100%;

        &:hover {
            opacity: 0.9;
        }
    }

    @media (min-width: 770px) {
        background: var(--color-background-grey);
    }
}

</style>