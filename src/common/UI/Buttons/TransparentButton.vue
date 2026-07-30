<template>
    <div class="button-container">
        <a v-if="link && regularLink" :target="target" :href="link">{{ buttonText }}</a>
        <router-link v-else-if="link" :to="link">{{ buttonText }}</router-link>
        <button v-else @click="click" class="transparent-button">
            {{ buttonText }}
        </button>
    </div>
</template>

<script>
export default {
    props: {
        buttonText: {
            type: String,
            require: true,
        },
        click: {
            type: Function,
            default: () => Function,
        },
        regularLink: {
            type: Boolean,
            default: () => false,
        },
        link: {
            type: String,
            default: () => '',
        },
        target: {
            type: String,
            default: () => '',
        },
    },
}
</script>

<style lang="scss" scoped>
.button-container {
    text-align: center;
    > button,
    a {
        text-align: center;
        border: 2px solid #b4853b;
        padding: 6px 48px;
        background: none;
        color: #b4853b;
        border-radius: 8px;
        transition: 0.4s ease-in;
        font: {
            weight: 600;
            family: 'Poppins', sans-serif;
            size: 15px;
        }
        &:hover {
            color: #111315;
            background: #b4853b;
        }
    }
}
</style>
