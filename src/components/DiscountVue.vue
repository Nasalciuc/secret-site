<template>
    <div>
        <div class="block-discount">
            <p>
                Save extra <span style="color: #b4853b">$300</span> with Your Discount ID
                <span style="font-weight: bold; color: #b4853b">{{ discountCode }}</span>
            </p>
            <span class="asterisk" @click="showDisclaimerModal = true">Disclaimer*</span>
        </div>
        <DisclaimerForm v-if="showDisclaimerModal" @close="showDisclaimerModal = false" />
    </div>
</template>

<script>
import DisclaimerForm from './PopUp/DisclaimerForm.vue'

export default {
    components: {
        DisclaimerForm,
    },
    data() {
        return {
            discountCode: '',
            showDisclaimerModal: false,
        }
    },
    methods: {
        generateDiscountCode() {
            const prefix = 'BBC'
            const randomPart = this.generateRandomString(6)
            const formattedCode = `${prefix}${randomPart.slice(0, 3)}-${randomPart.slice(3)}`
            this.discountCode = formattedCode
        },
        generateRandomString(length) {
            let result = ''
            const characters = '0123456789'
            const charactersLength = characters.length
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength))
            }
            return result
        },
    },
    mounted() {
        this.generateDiscountCode()
    },
}
</script>

<style scoped>
.block-discount {
    position: relative;
    text-align: center;
    padding-left: 50px;
    padding-bottom: 20px;
    background-color: #1a1d1f8f;
    border-radius: 16px;
    padding-top: 10px;
}
p {
    font-size: 13px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    color: white;
    width: fit-content;
    padding-top: 10px;
}
.asterisk {
    position: absolute;
    top: 4px;
    right: 10px;
    font-size: 10px;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
}
@media (max-width: 768px) {
    p {
        margin-left: -20px;
    }
}
</style>
