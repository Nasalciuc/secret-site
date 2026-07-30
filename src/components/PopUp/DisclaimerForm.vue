<template>
    <div class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <h3 class="modal-title">Disclaimer</h3>
            <p class="modal-body">
                All fares are quoted in USD and include taxes, fees, and applicable surcharges. Prices are per person,
                starting from business class weekday travel (Monday - Thursday) from the USA. The final price varies
                based on class of service, departure city, airline, and route. Typically, the lowest transatlantic fares
                depart from the East Coast, and the lowest transpacific fares from the West Coast. Please note that
                BuyBusinessClass may not display some travel partners or itinerary details online to avoid direct
                competition with our partners' retail sales. Savings of up to 82% are based on the full, unrestricted
                published fares of major airlines, though individual fare rules apply, and savings may vary. Some
                airlines may impose additional baggage charges. Fares are subject to availability in the relevant
                booking inventory, and seats are limited and may not be available on all flights and dates. These fares
                come with flexible booking policies, including free exchanges or cancellations through our partner
                airlines. In case of trip cancellation, unless stated otherwise, you will retain travel credit with the
                issuing airline for up to one year, excluding airline fees. In case of exchanges, fare differences may
                apply. Please note that fares and their associated rules are subject to change without prior notice, and
                other restrictions may apply. We also offer a $200 referral discount: referring customers earn $100 in
                their BuyBusinessClass account for each new customer who uses their referral code, and referred
                customers receive a $100 discount on their first eligible purchase. Contact us toll-free for current
                pricing, itinerary details, and more information about our referral program. BuyBusinessClass guarantees
                that our privately negotiated transatlantic and transpacific business class fares from the U.S. are the
                lowest on the market with our "Best Price Guarantee". Terms and conditions apply; to claim the voucher,
                please contact your travel agent. For further details and program limitations, please refer to our
                'Terms of Use'.
            </p>
            <button class="modal-close" @click="closeModal">Close</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeModal() {
            this.$emit('close')
        },
    },
}
</script>

<style scoped>
.modal-overlay {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background-color: rgba(0, 0, 0, 0) !important;
    justify-content: center !important;
    align-items: center !important;
    z-index: 1000 !important;
}

.modal-content {
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
    max-height: 80vh;
    width: 80%;
    max-width: 600px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    text-align: center;
    position: fixed;
}

.modal-title {
    font-size: 20px;
    margin-bottom: 15px;
    color: #b4853b;
}

.modal-body {
    font-size: 12px;
    margin-bottom: 20px;
    color: white;
    font-family: 'Inter', sans-serif;
}

.modal-close {
    background-color: #b4853b;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.modal-close:hover {
    background-color: #c28016;
}
</style>
