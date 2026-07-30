<template>
    <div class="black-orange-button">
        <a v-if="link && regularLink" :href="link">{{ buttonText }}</a>
        <router-link v-else-if="link" :to="link">{{ buttonText }}</router-link>
        <button v-else @click="click">{{ buttonText }}</button>
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
        link: {
            type: String,
            default: () => '',
        },
        regularLink: {
            type: Boolean,
            default: () => false,
        },
    },
}
</script>

<style lang="scss" scoped>
.black-orange-button {
    width: 100%;
    position: relative;
    > button,
    a {
        display: block;
        border-radius: 8px;
        text-align: center;
        background: #1a1d1f;
        width: 100%;
        padding: 12px 20px;
        color: #b4853b;
        transition: 0.4s ease-in;
        font: {
            family: 'Poppins', sans-serif;
            weight: 600;
            size: 15px;
        }
        box-shadow: 0 0 10px #dbdde0;
        &:hover {
            background: #272b30;
        }
    }
}
</style>
