<template>
    <div class="margin-container margin-layout" :class="{ 'hide-bars': loading.loading }">
        <header-component class="margin-layout" />
        <router-view :key="$route.path" />
    </div>
</template>

<script>
// Components
import HeaderComponent from '../components/Header/HeaderComponent.vue'

// Vuex
import { mapState } from 'vuex'

export default {
    components: {
        HeaderComponent,
    },
    computed: {
        ...mapState({
            loading: (state) => state.app.quoteLoading,
        }),
    },
}
</script>
