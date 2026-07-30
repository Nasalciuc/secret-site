<template>
    <div>
        <Teleport to="body">
            <div
                ref="toPop"
                :class="`single-calendar ${calendarCollapse ? '' : 'vs-open'}`"
                v-click-outside="doCalendarCollapse"
            >
                <DatePicker
                    mode="date"
                    v-model="date"
                    :step="step"
                    :locale="`en`"
                    :min-date="new Date(minDate)"
                    @update:modelValue="dateSelected"
                />
            </div>
        </Teleport>
    </div>
</template>

<script>
import { DatePicker } from 'v-calendar'
import { createPopper } from '@popperjs/core'
import flip from '@popperjs/core/lib/modifiers/flip.js'

export default {
    name: 'DatePickerComponent',
    components: {
        DatePicker,
    },
    props: {
        step: {
            type: Number,
            default: () => 1,
        },
        minDate: {
            type: Number,
            required: true,
        },
        calendarCollapse: {
            type: Boolean,
            required: true,
        },
        defaultDate: {
            type: Boolean,
            default: () => true,
        },
        target: {
            type: [null, Element],
            default: () => null,
        },
        dataIndex: {
            type: Number,
            default: () => 0,
        },
    },
    data() {
        return {
            popper: null,
            date: this.defaultDate ? Date.now() : null,
        }
    },
    watch: {
        calendarCollapse(n) {
            if (!n) {
                this.popper?.update()
            }
        },
        target: {
            immediate: true,
            handler(n) {
                if (n && this.$refs.toPop) {
                    this.initPopper(n, this.$refs.toPop)
                }
            },
        },
        '$refs.toPop': {
            immediate: true,
            handler(n) {
                if (n && this.target) {
                    this.initPopper(this.target, n)
                }
            },
        },
    },
    methods: {
        initPopper(target, poper) {
            this.popper?.destroy()

            this.popper = createPopper(target, poper, {
                modifiers: [flip],
                placement: 'bottom',
            })
        },
        dateSelected() {
            this.$emit('updateValue', new Date(this.date).toLocaleDateString('fr-CH'))
        },
        doCalendarCollapse(event) {
            this.$emit('doCalendarCollapse', event, this.dataIndex)
        },
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.single-calendar {
    @include calendar;
}
</style>
