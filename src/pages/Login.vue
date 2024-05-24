<script setup>
import {ref} from 'vue'
import {useRootStore} from '@/stores/root'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate';
import FormInput from '@/components/FormInput.vue'
import ShButton from '@/components/ShButton.vue'

const rootStore = useRootStore()
const router = useRouter()

const { loadingLogin } = storeToRefs(rootStore)

const passwordFieldType = ref('password')

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

const switchVisibilityPassword = () => {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
}

const onSubmit = handleSubmit(async (values) => {
    await rootStore.loginUser(values)

    if (!!rootStore.getAuthToken()) {
        router.push({name: 'home'})
    }
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

                <ShButton class="login__btn" :loading="loadingLogin">
                    <span>Submit</span>
                </ShButton>
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
    width: 100%;
    color: var(--color-text-login);

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
        margin-top: 32px;
    }

    @media (min-width: 770px) {
        background: var(--color-background-grey);
    }
}

</style>