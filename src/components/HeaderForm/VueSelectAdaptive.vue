<template>
    <div class="select-options-adaptive">
        <div class="adaptive-select-options-buttons" @click="showForm">
            <button>{{ type }}</button>
            <button>
                {{ `Passengers ${travelers.adult + travelers.child + travelers.infant}` }}
            </button>
        </div>
        <div :class="`form ${!collapse ? 'show' : 'collapse'}`" v-click-outside="clickedOutside">
            <choose-class :type="type" @setType="(type) => $emit('setType', type)" />
            <choose-passengers :travelers="travelers" @setTravelers="(travelers) => $emit('setTravelers', travelers)" />
        </div>
    </div>
</template>

<script>
// Components
import ChooseClass from './ChooseClass.vue'
import ChoosePassengers from './ChoosePassengers.vue'

export default {
    props: {
        type: {
            type: String,
        },
        travelers: {
            type: Object,
        },
    },
    components: {
        ChooseClass,
        ChoosePassengers,
    },
    data() {
        return {
            collapse: true,
        }
    },
    methods: {
        showForm() {
            this.collapse = false
        },
        clickedOutside(event) {
            if (!this.collapse && !event.target.parentNode?.classList?.contains('adaptive-select-options-buttons')) {
                this.collapse = true
            }
        },
    },
}
</script>

<style lang="scss">
.adaptive-select-options-buttons {
    > button {
        display: block;
        color: #dadde0;
        background: none;
        width: 100%;
        text-align: center;
        line-height: 24px;
        font: {
            family: 'Inter', sans-serif;
            size: 14px;
            weight: 600;
        }
    }
}

.select-options-adaptive {
    &.xyz-nested {
        position: relative;
        z-index: 200;
    }
    > .form {
        position: absolute;
        border-radius: 16px;
        transform: translateX(-100%);
        padding: 24px;
        margin-top: 65px;
        top: 0;
        left: 100%;
        width: 100%;
        z-index: 200;
        transition: 0.2s ease-in;
        background: #111315;
        border: 1px solid #6f767e;
        &.collapse {
            opacity: 0;
            visibility: hidden;
        }
        &.show {
            opacity: 1;
            visibility: visible;
        }
        > .choose-cabin-type,
        > .choose-ammount-travelers {
            background: none;
            box-shadow: unset;
            backdrop-filter: unset;
            border: none;
        }
        > .choose-cabin-type::after {
            content: '';
            position: absolute;
            margin-top: 16px;
            width: 100%;
            height: 1px;
            background: #272b30;
        }
        > .choose-ammount-travelers {
            margin-top: 32px;
        }
        > * {
            background: none;
        }
    }
}
</style>
