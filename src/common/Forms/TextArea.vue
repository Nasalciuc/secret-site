<template>
    <div class="textarea-container">
        <textarea
            :value="modelValue"
            :placeholder="placeholder"
            @input="$emit('update:modelValue', $event.target.value)"
        />
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: () => '',
        },
        modelValue: {
            type: String,
            default: () => '',
        },
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.textarea-container {
    @include form-mixin;

    > textarea {
        resize: none;
    }
}
</style>
