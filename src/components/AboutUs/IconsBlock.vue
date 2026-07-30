<template>
    <div class="footer-container">
        <div class="icons-block">
            <svg-container class="services-logo" />
            <img
                width="50"
                height="50"
                class="secure-3d"
                :src="require('@/assets/images/static/3d-secure.jpeg')"
                alt="3d secure"
                loading="lazy"
                decoding="async"
            />
        </div>
    </div>
</template>

<script>
// Components
import SvgContainer from '@/components/Header/SvgContainer.vue'

export default {
    components: {
        SvgContainer,
    },
}
</script>

<style lang="scss" src="@/styles/footer.scss"></style>
<style scoped lang="scss">
.secure-3d {
    margin-inline: 10px;
}

.socials {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: white;
    padding-bottom: 2rem;
    font-size: 1.5rem;

    a {
        opacity: 0.24;

        &:hover {
            opacity: 1;
        }
    }
}
</style>
