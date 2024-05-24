<script setup>
import { ref, computed } from "vue"
import axios from 'axios'
import {GAME_LINK_URL} from '../constants'
import ShButton from '@/components/ShButton.vue'

const loading = ref(false)

const props = defineProps({
    model: {
        type: Object,
        default: () => ({})
    }
})

const image = computed(() => {
    return props.model.attributes?.image || ''
})

const title = computed(() => {
    return props.model.attributes?.title || ''
})

const getGameLink = async () => {

    if(!!props.model.id) {
        try {
            loading.value = true

            const responce = await axios.post(`${GAME_LINK_URL.replace('{gameId}', props.model.id)}`, {
                clientId: "default", 
                gameId: props.model.id       
            })

            const link = responce.data?.data[0]?.attributes['launch-options']?.['game-url']
            if(!!link) {
                window.open(link, '_blank')
            }

            loading.value = false

        } catch(error) {
            console.log(error)
        }
      }
}

</script>

<template>
    <div class="game-item">
        <figure class="l-box l-box_fdc">
            <figcaption>{{ title }}</figcaption>
            <div class="game-item__wrapper-image">
                <img v-if="!!image" :src="image" alt="game image">
                <img v-else src="@/assets/images/no_image.jpg" alt="game image">
            </div>
            
            <ShButton :loading="loading" @click="getGameLink">
                <span>Play Demo</span>
            </ShButton>
        </figure>
    </div>
</template>

<style lang="scss">
.game-item {
    width: 100%;

    figure {
        margin: 0 18px 32px;
    }

    &__wrapper-image {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 90%;
      text-align: center;
      margin-bottom: 12px;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
    }

    @media (min-width: 640px) {
        width: 50%;
    }

    @media (min-width: 1180px) {
        width: 33.3333%;
    }

    @media (min-width: 1440px) {
        width: 25%;
    }
}

</style>