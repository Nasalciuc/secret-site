<template>
    <div class="orange-filled-button">
        <router-link v-if="link" :to="link">{{ buttonText }}</router-link>
        <button v-else @click="click">{{ buttonText }}</button>
    </div>
</template>

<script>
export default {
    props: {
        buttonText: {
            type: String,
            default: () => 'None',
        },
        click: {
            type: Function,
            default: () => Function,
        },
        link: {
            type: String,
            default: () => '',
        },
    },
}
</script>

<style lang="scss" scoped>
.orange-filled-button {
    width: 100%;
    > button,
    a {
        width: 100%;
        padding: 12px 24px;
        background: #b4853b;
        border-radius: 8px;
        font-family: 'Poppins,', sans-serif;
        transition: background 0.3s ease;
        color: #111315;
        font-weight: 600;
        font-size: 15px;
        &:hover {
            background: #d5a474;
        }
    }
}
</style>
