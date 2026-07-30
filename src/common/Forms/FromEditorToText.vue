<template>
    <div v-if="title" class="main-title editor">
        <p v-for="(item, index) in blocks" :key="`${this.is}-${index}`" v-html="item.data.text" />
    </div>
    <div v-else class="text-from-editor">
        <div class="content" v-for="(item, index) in blocks" :key="`editor-${index}-${this.id}`">
            <component v-if="item.type === 'header'" :is="`h${item.data.level}`" class="header">
                {{ item.data.text }}
            </component>
            <img
                v-else-if="item.type === 'image'"
                :src="item.data.file.url"
                alt="image"
                loading="lazy"
                decoding="async"
            />
            <p v-else-if="item.type === 'paragraph'" v-html="item.data.text"></p>
            <ul v-else-if="item.type === 'list'">
                <li v-for="(list, index) in item.data.items" :key="`list-${index}-${Date.now()}`" v-html="list" />
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: Boolean,
            default: () => false,
        },
        blocks: {
            type: Array,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
}
</script>

<style lang="scss">
.main-title {
    &.editor {
        display: flex;
        justify-content: center;
        p::after {
            content: '\00a0';
        }
    }
}

.text-from-editor {
    display: flex;
    flex-direction: column;
    font-weight: 300;
    font-family: 'Inter', sans-serif;
    gap: 8px;
    b {
        font-weight: 600;
    }
    a {
        text-decoration: underline;
    }
}
</style>
