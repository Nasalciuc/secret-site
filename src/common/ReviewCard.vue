<template>
    <div class="review-card-container">
        <div class="review-card-header">
            <div class="avatar">
                {{
                    name
                        .split(' ')
                        .slice(0, 2)
                        .reduce((prev, cur) => prev + cur[0], '')
                }}
            </div>
            <div class="info-container">
                <p>{{ name }}</p>
                <div class="stars">
                    <star-vue v-for="index in stars" :key="`review-${name}-${index}`" />
                </div>
            </div>
        </div>
        <div class="review-card-body">
            <p class="topic">{{ topic }}</p>
            <p class="comment">{{ comment }}</p>
        </div>
    </div>
</template>

<script>
// Components
import StarVue from './Icons/StarVue.vue'

export default {
    components: {
        StarVue,
    },
    props: {
        name: {
            type: String,
            require: true,
        },
        topic: {
            type: String,
            default: () => '',
        },
        comment: {
            type: String,
            require: true,
        },
        stars: {
            type: Number,
            default: () => 0,
        },
    },
}
</script>

<style lang="scss">
.review-card-container {
    padding: 24px;
    background: #111315;
    border-radius: 16px;
    width: 320px;
    color: #fff;
    > .review-card-header {
        display: flex;
        margin-bottom: 16px;
        > .info-container {
            margin-left: 8px;
            > .stars {
                display: flex;
                svg {
                    height: 24px;
                    width: 24px;
                }
            }
            > p {
                margin-bottom: 8px;
                font: {
                    family: 'Inter';
                    weight: 700;
                    size: 14px;
                }
            }
        }
        > .avatar {
            width: 56px;
            height: 56px;
            background: #b4853b;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #111315;
            text-transform: uppercase;
            font: {
                family: 'Inter', sans-serif;
                weight: 700;
                size: 15px;
            }
        }
    }
    > .review-card-body {
        > .topic {
            margin-bottom: 8px;
            font: {
                family: 'Inter', sans-serif;
                weight: 700;
                size: 14px;
            }
        }
        > .comment {
            color: #c2c7cc;
            line-height: 24px;
            font: {
                weight: 400;
                family: 'Inter', sans-serif;
                size: 12px;
            }
        }
    }
}
</style>
