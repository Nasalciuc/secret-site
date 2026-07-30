<template>
    <v-select
        class="transparent-vselect"
        :searchable="false"
        :options="options"
        :label="label"
        v-model="selected"
        ref="select"
    >
        <template #open-indicator>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.79289 8.54289C5.18342 8.15237 5.81658 8.15237 6.20711 8.54289L12 14.3358L17.7929 8.54289C18.1834 8.15237 18.8166 8.15237 19.2071 8.54289C19.5976 8.93341 19.5976 9.56658 19.2071 9.9571L13.4142 15.75C12.6332 16.531 11.3668 16.531 10.5858 15.75L4.79289 9.95711C4.40237 9.56658 4.40237 8.93342 4.79289 8.54289Z"
                    fill="#C2C7CC"
                />
            </svg>
        </template>
        <template v-if="link" v-slot:option="option">
            <router-link @click="$event.stopPropagation()" :to="`${link}/${option.name.toLowerCase()}/${option.id}`">
                {{ option.name }}
            </router-link>
        </template>
    </v-select>
</template>

<script>
export default {
    data() {
        return {
            selected: this.value,
        }
    },
    props: {
        options: {
            type: Array,
            default: () => [],
        },
        value: {
            type: String,
            default: () => '',
        },
        label: {
            type: String,
            default: () => 'label',
        },
        link: {
            type: String || false,
            default: () => false,
        },
    },
    watch: {
        value(value) {
            this.selected = value
        },
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.transparent-vselect {
    font-family: 'Inter', sans-serif;
    .vs__dropdown-toggle {
        padding: 0;
        border: none;
        > .vs__selected-options {
            margin-right: 30px;
            > .vs__selected,
            > .vs__search::placeholder {
                color: #c2c7cc;
                text-transform: capitalize;
                position: unset;
                padding: 0;
                opacity: unset;
                line-height: unset;
                margin: 0;
                font: {
                    family: 'Inter', sans-serif;
                    size: 15px;
                }
            }
            > .vs__search {
                width: 0;
                height: 0;
                padding: 0;
                margin: 0;
            }
        }
        > .vs__actions {
            position: absolute;
            top: -6px;
            right: 0;
            > button {
                display: none;
            }
            .vs__open-indicator {
                width: 24px;
                height: 22px;
            }
        }
    }
    > ul {
        @include v-select-list;
        left: unset;
        right: 0;
        margin-top: 10px;
        > li {
            padding: 0;
            > a {
                text-decoration: none;
                color: #c2c7cc;
                padding: 8px;
                width: 100%;
                height: 100%;
                display: block;
            }
        }
    }

    @media screen and (max-width: 768px) {
        border: 1px solid #dadde0;
        border-radius: 12px;
        padding: 3px 6px;
        .vs__actions {
            top: 1.5px !important;
            > svg {
                width: 16px;
                height: 16px;
            }
        }
        > ul {
            right: unset;
            left: 0;
        }
    }
}
</style>
