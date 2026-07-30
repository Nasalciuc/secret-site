<template>
    <div class="choose-ammount-travelers">
        <label>Travelers</label>
        <div class="travelers-buttons">
            <span class="adults">Adults</span>
            <div class="right-block">
                <button class="control minus" @click="decrease('adult')">-</button>
                <span class="ammount">{{ travelers.adult }}</span>
                <button class="control plus" @click="increase('adult')">+</button>
            </div>
        </div>
        <div class="travelers-buttons">
            <span class="adults">Childrens</span>
            <div class="right-block">
                <button class="control minus" @click="decrease('child')">-</button>
                <span class="ammount">{{ travelers.child }}</span>
                <button class="control plus" @click="increase('child')">+</button>
            </div>
        </div>
        <div class="travelers-buttons">
            <span class="adults">Infants</span>
            <div class="right-block">
                <button class="control minus" @click="decrease('infant')">-</button>
                <span class="ammount">{{ travelers.infant }}</span>
                <button class="control plus" @click="increase('infant')">+</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        travelers: {
            type: Object,
            default: () => ({
                adult: 1,
                child: 0,
                infant: 0,
            }),
        },
    },
    methods: {
        increase(type) {
            if (this.travelers[type] >= 9) {
                return
            }

            this.$emit('setTravelers', {
                ...this.travelers,
                [type]: this.travelers[type] + 1,
            })
        },
        decrease(type) {
            if (this.travelers[type] === 1 && type === 'adult') {
                return
            }

            if (this.travelers[type] === 0 && (type === 'infant' || type === 'child')) {
                return
            }

            this.$emit('setTravelers', {
                ...this.travelers,
                [type]: this.travelers[type] - 1,
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.choose-ammount-travelers {
    transition: 0.4s ease-in;
    border-radius: 16px;
    min-width: 250px;
    background: #111315;
    border: 1px solid #6f767e;
    > .travelers-buttons {
        margin-top: 8px;
        display: flex;
        align-items: center;
        > .adults {
            color: #efefef;
            font-weight: 600;
        }
        > .right-block {
            display: flex;
            justify-content: space-between;
            align-items: center;
            > button {
                background: #272b30;
                border-radius: 50%;
                width: 32px;
                height: 32px;
                font-size: 24px;
                padding-bottom: 12px;
                &.minus {
                    color: #6f767e;
                }
                &.plus {
                    color: #b4853b;
                }
            }
            > .ammount {
                color: #efefef;
                font-weight: 600;
            }
        }
        > * {
            flex-grow: 1;
            width: 0;
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
