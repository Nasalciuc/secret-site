<template>
    <div class="input-container" :class="{ 'has-error': error }">
        <input
            :placeholder="placeholder"
            :type="type"
            :name="name"
            :value="modelValue"
            :required="required"
            :pattern="pattern"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <span v-if="pattern" />
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: () => '',
        },
        name: {
            type: String,
            default: () => '',
        },
        type: {
            type: String,
            default: () => 'input',
        },
        required: {
            type: Boolean,
            default: () => false,
        },
        pattern: {
            type: [String, Boolean],
            default: () => false,
        },
        modelValue: {
            type: String,
            required: true,
        },
        error: {
            type: Boolean,
            default: () => false,
        },
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.input-container {
    @include form-mixin;

    position: relative;

    > input:focus:invalid + span::after {
        content: 'Invalid';
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
        font: {
            family: 'Inter', sans-serif;
            size: 13px;
        }
    }
}
</style>
