<template>
    <div class="header-layout">
        <header-component class="header-layout" />
        <router-view :key="$route.path" />
    </div>
</template>

<script>
// Components
import HeaderComponent from '../components/Header/HeaderComponent.vue'

export default {
    components: {
        HeaderComponent,
    },
}
</script>

<style lang="scss">
.header-layout > .header-container {
    @media screen and (max-width: 1200px) {
        margin: 8px 8px 56px 8px;
        > .service {
            right: 32px;
        }
    }

    @media screen and (max-width: 768px) {
        width: unset;
        > .service {
            right: 8px;
        }
    }
}
</style>
