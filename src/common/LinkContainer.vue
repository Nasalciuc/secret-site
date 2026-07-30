<template>
    <div class="header-links"><slot /></div>
</template>

<style lang="scss">
@import '@/styles/mixins.scss';

.header-links {
    display: flex;
    padding: 12px 24px;
    margin-left: 32px;
    align-items: center;
    background: rgba(0, 0, 0, 0.16);
    border-radius: 8px;
    gap: 48px;
    > .page-link {
        position: relative;
        cursor: pointer;
        color: #fff;
        font-size: 0.8vw;
        font-family: 'Inter', sans-serif;
        &.router-link-exact-active {
            @include after-active;

            font-weight: 700;
        }
    }
}
</style>
