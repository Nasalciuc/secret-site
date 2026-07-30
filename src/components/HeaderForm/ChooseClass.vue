<template>
    <div class="choose-cabin-type">
        <label>Cabin Type</label>
        <div class="cabin-buttons">
            <button @click="$emit('setType', 'Business Class')" :class="type === 'Business Class' ? 'active' : ''">
                Business Class
            </button>
            <button @click="$emit('setType', 'First Class')" :class="type === 'First Class' ? 'active' : ''">
                First Class
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: () => 'Business Class',
        },
    },
}
</script>

<style lang="scss" scoped>
.choose-cabin-type {
    position: relative;
    border-radius: 16px;
    min-width: 250px;
    background: #111315;
    border: 1px solid #6f767e;
    > .cabin-buttons {
        margin-top: 8px;
        border: 1px solid #1a1d1f;
        width: fit-content;
        border-radius: 12px;
        display: flex;
        gap: 8px;
        > button {
            color: #a5aaaf;
            border-radius: 12px;
            padding: 8px;
            transition: background-color 0.2s ease-in;
            background: none;
            font: {
                size: 15px;
                weight: 600;
            }
            &.active {
                color: #b4853b;
                background: #272b30;
            }
        }
    }
    label {
        color: #6f767e;
        font: {
            weight: 700;
            size: 12px;
        }
    }
    button {
        background: none;
    }
    * {
        font-family: 'Inter', sans-serif;
    }
}
</style>
