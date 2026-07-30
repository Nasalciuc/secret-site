<template>
    <div class="container-airline">
        <div class="content-wrapper">
            <div class="airline-details">
                <div class="promo-container">
                    <h2 class="promo-title">Business Class Flights for Students <br /><span></span></h2>
                    <p class="promo-description">
                        Book today and save up to <strong>50 - 77%*</strong> OFF – specially curated business class
                        offers for students looking to travel in style and comfort without breaking the bank.
                    </p>
                    <div class="promo-price-box">
                        <div class="promo-price">
                            <span class="from-text">FROM</span>
                            <div class="price-amount">$969<span class="asterisk">*</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <second-block />
        </div>
    </div>
</template>

<script>
import SecondBlock from '../components/HeaderForm/FlightCard/SecondBlock.vue'

export default {
    components: { SecondBlock },
    mounted() {
        const canonicalUrl = `https://buybusinessclass.com/promo/senior-business-class-discounts`

        const canonicalLink = document.createElement('link')
        canonicalLink.rel = 'canonical'
        canonicalLink.href = canonicalUrl
        document.head.appendChild(canonicalLink)
    },
}
</script>
<style lang="scss">
.container-airline {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    height: 100vh;
    overflow: hidden;
    background-image: url('@/assets/images/static/europe.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
        height: auto;
        padding: 20px;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 10px;
        height: auto;
        padding: 30px;
        background-size: cover;
    }
}

.content-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    max-width: 100%;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
        padding-top: 30%;
    }
}

.second-block {
    width: 35%;
    height: 30%;

    @media (max-width: 1024px) {
        width: 45%;
        height: auto;
    }

    @media (max-width: 768px) {
        width: 80%;
        height: auto;
    }

    @media (max-width: 480px) {
        width: 100%;
        height: auto;
    }
}
.promo-container {
    background-color: #f9f6f3;
    padding: 62px;
    max-width: 800px;
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
}

.promo-title {
    font-size: 34px;
    color: #001b47;
    font-weight: 700;
    line-height: 1.4;
    margin-bottom: 12px;
}

.promo-title span {
    display: inline;
    font-weight: 600;
}

.promo-description {
    color: #444;
    font-size: 15px;
    margin-bottom: 20px;
}

.promo-price-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.promo-price .from-text {
    font-size: 13px;
    color: #b4853b;
    font-weight: 600;
    letter-spacing: 1px;
}

.price-amount {
    font-size: 36px;
    font-weight: 700;
    color: #001b47;
    line-height: 1;
}

.asterisk {
    font-size: 18px;
    vertical-align: super;
}

.price-note {
    font-size: 14px;
    color: #444;
    margin-top: 4px;
}

.request-button {
    background-color: #b4853b;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
}

.request-button:hover {
    background-color: #946c2f;
}
</style>
