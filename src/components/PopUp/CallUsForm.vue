<template>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <button class="close-button" @click="closeModal">&times;</button>
            <h3 class="modal-header">Call us to book your trip now!</h3>
            <a :href="'tel:' + phoneNumber" class="call-button">
                {{ formattedPhoneNumber }}
            </a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showModal: false,
            phoneNumber: '18883227999',
        }
    },
    computed: {
        formattedPhoneNumber() {
            return this.phoneNumber.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4')
        },
    },
    mounted() {
        setTimeout(() => {
            this.showModal = true
        }, 5000)
    },
    methods: {
        closeModal() {
            this.showModal = false
        },
    },
}
</script>

<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: #e5d2bd;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    width: fit-content;
    text-align: center;
    border: 2px solid #fff;
}

.modal-header {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
    text-transform: uppercase;
}

.call-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #b88651;
    color: #fff;
    text-decoration: none;
    border-radius: 20px;
    font-size: 18px;
    font-weight: bold;
    transition: background-color 0.3s ease;
    border: none;
}

.call-button:hover {
    background-color: #a57446;
}

.close-button {
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    cursor: pointer;
}
</style>
