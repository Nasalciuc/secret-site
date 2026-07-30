<template>
    <div class="blog-content">
        <component v-if="item.type === 'header'" :is="`h${item.data.level}`" class="header">
            {{ item.data.text }}
        </component>
        <img v-else-if="item.type === 'image'" :src="item.data.file.url" alt="image" loading="lazy" decoding="async" />
        <p v-else-if="item.type === 'paragraph'" v-html="item.data.text"></p>
        <ul v-else-if="item.type === 'list'">
            <li v-for="(list, index) in item.data.items" :key="`list-${index}-${Date.now()}`">
                {{ list }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            require: true,
        },
    },
}
</script>

<style lang="scss">
.blog-content {
    > p,
    > ul {
        line-height: 24px;
        color: #c2c7cc;
        font: {
            family: 'Inter', sans-serif;
            size: 15px;
            weight: 400;
        }
        > b,
        > a {
            color: inherit;
        }
        > a {
            text-decoration: underline;
        }
    }
    > .header {
        color: #b4853b;
        margin-bottom: 16px;
        font: {
            family: 'SSP-regular', sans-serif;
            size: 32px;
        }
    }
    > img {
        margin-bottom: 16px;
        width: 100%;
    }
}
</style>
