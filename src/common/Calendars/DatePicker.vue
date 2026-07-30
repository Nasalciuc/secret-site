<template>
    <div>
        <Teleport to="body">
            <div
                ref="toPop"
                :class="`calendar ${calendarCollapse ? '' : 'vs-open'}`"
                v-click-outside="doCalendarCollapse"
            >
                <DatePicker
                    mode="range"
                    :columns="appWidth <= 768 ? 1 : 2"
                    :locale="`en`"
                    :min-date="new Date(minDate)"
                    :attributes="[
                        {
                            key: 'select-drag',
                            dates: attributes,
                        },
                    ]"
                    :popover="true"
                    @dayclick="selectedData"
                >
                    <template #day-content="day">
                        <div
                            @click="day.dayEvents.click"
                            @focusin="day.dayEvents.focusin"
                            @focusout="day.dayEvents.focusout"
                            @keydown="day.dayEvents.focusout"
                            @mouseenter="mouseEnter"
                            :aria-disabled="day.dayProps['aria-disabled']"
                            :aria-label="day.dayProps['aria-label']"
                            :tabindex="day.dayProps.tabindex"
                            :role="day.dayProps.role"
                            :class="['vc-day-content', 'vc-focusable', 'vc-focus', 'vc-attr', outline(day)]"
                        >
                            {{ day.day.label }}
                        </div>
                    </template>
                </DatePicker>
            </div>
        </Teleport>
    </div>
</template>

<script>
// Components
import { DatePicker } from 'v-calendar'
import { createPopper } from '@popperjs/core'
import flip from '@popperjs/core/lib/modifiers/flip.js'

// Vuex
import { mapState } from 'vuex'

export default {
    name: 'DateRangePickerComponent',
    props: {
        minDate: {
            type: Number,
            required: true,
        },
        calendarCollapse: {
            type: Boolean,
            required: true,
        },
        selectReturn: {
            type: Boolean,
            default: () => false,
        },
        target: {
            type: [null, Element],
            default: () => null,
        },
    },
    data() {
        return {
            popper: null,
            selectEnd: false,
            switched: false,
            attributes: {
                start: new Date(new Date().toLocaleDateString('en-GB').replace(/(\d+[/])(\d+[/])/, '$2$1')).getTime(),
                end: new Date(new Date().toLocaleDateString('en-GB').replace(/(\d+[/])(\d+[/])/, '$2$1')).getTime(),
            },
        }
    },
    components: {
        DatePicker,
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
                if (n) {
                    this.popper?.destroy()

                    this.popper = createPopper(n, this.$refs.toPop, {
                        modifiers: [flip],
                        placement: 'bottom',
                    })
                }
            },
        },
    },
    computed: {
        ...mapState({
            appWidth: (state) => state.app.appWidth,
        }),
    },
    methods: {
        outline(day) {
            const currentDate = new Date(day.day.ariaLabel).getTime()

            switch (true) {
                case currentDate + 86400000 <= this.attributes.start:
                case currentDate - 86400000 >= this.attributes.end:
                    return ''
                case currentDate === this.attributes.start:
                case currentDate === this.attributes.end:
                    return 'vc-highlight-content-solid'
                case day.attributes[0]?.key === 'select-drag':
                    return 'vc-highlight-content-light'
                default:
                    return ''
            }
        },
        mouseEnter(event) {
            if (this.selectEnd) {
                if (event.target.attributes['aria-disabled'].value === 'true') {
                    return
                }

                const end = new Date(event.target.attributes['aria-label'].value).getTime()

                if (end < this.attributes.start) {
                    if (!this.switched) {
                        this.attributes.end = this.attributes.start
                    }
                    this.attributes.start = end
                    this.switched = true
                    return
                }

                if (this.switched) {
                    if (end >= this.attributes.end) {
                        this.attributes.start = this.attributes.end
                        this.attributes.end = end
                        this.switched = false
                        return
                    }
                    this.attributes.start = end
                    return
                }

                this.attributes.end = end
            }
        },
        selectedData(event) {
            if (this.selectEnd) {
                this.$emit('updateValue', {
                    start: new Date(this.attributes.start).toLocaleDateString('fr-CH'),
                    end: new Date(this.attributes.end).toLocaleDateString('fr-CH'),
                })

                this.switched = false
                this.selectEnd = false
                return
            }

            if (this.selectReturn) {
                this.$emit('updateValue', {
                    start: new Date(this.attributes.start).toLocaleDateString('fr-CH'),
                    end: new Date(event.date).toLocaleDateString('fr-CH'),
                })

                this.attributes.end = new Date(event.date).getTime()
                return
            }

            this.$emit('updateValue', {
                start: new Date(event.startDate).toLocaleDateString('fr-CH'),
            })

            this.attributes.start = new Date(event.startDate).getTime()
            this.attributes.end = this.attributes.start
            this.selectEnd = true
        },
        doCalendarCollapse(event) {
            this.$emit('doCalendarCollapse', event)
        },
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.calendar {
    @include calendar;

    .vc-day {
        > .vc-highlights {
            display: none;
        }
        .vc-day-content {
            margin: auto;
        }
        .vs-day-layer {
            top: -2px;
        }
    }
}
</style>
