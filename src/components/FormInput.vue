<script setup>
import {ref, defineProps, defineEmits, defineModel} from 'vue'
import { useField } from 'vee-validate';

const emit = defineEmits(['switchType'])

const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    passwordField: {
        type: Boolean,
        default: false
    }
})

const { value, errorMessage } = useField(() => props.name);

</script>

<template>
    <div class="form-input" :class="{'form-input_password': passwordField, 'js--error': errorMessage}">
        <div class="form-input__wrapper l-box l-box_fdc">
            <label :for="name">{{ label }}</label>
            <input 
                v-model="value"
                :type="type" 
                :name="name"
                :placeholder="placeholder"
            >
            
            <button v-if="passwordField" type="button" @click="emit('switchType')">
                <span class="l-box l-box_jcc l-box_aic">
                    <img v-if="type === 'text'" alt="show icon" src="/src/assets/icons/show-outline.svg" />
                    <img v-else alt="hide icon" src="/src/assets/icons/hide-outline.svg" />
                </span>
            </button>  
        </div>
        
        <span class="form-input__error"> {{ errorMessage }} </span>
    </div>
</template>

<style lang="scss">
.form-input {

    &__wrapper {
        position: relative;
        overflow: hidden; 
    }

    input {
        padding: 0 8px;
        min-height: 32px;
        border: 1px solid var(--color-border-emphasis);
        border-radius: 4px; 

        &:focus-visible {
            border-color: var(--color-primary);
        }
    }

    &_password {

        input {
            padding-right: 40px;
        }

        button {
            position: absolute;
            bottom: 1px;
            right: 1px;
            padding: 8px;
            border-radius: 20px;
            color: var(--color-text-emphasis);

            &:hover {
                background: var(--color-btn-hover);
            }
        }
    }

    &.js--error {
        input {
            border-color: #ff003d;
        }
    }

    &__error {
        margin-top: 4px;
        display: block;
        color: #ff003d;
        font-size: 12px;
        line-height: 16px;
    }
}

</style>