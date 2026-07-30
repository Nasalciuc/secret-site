<template>
    <div>
        <div class="choose-description xyz-in" xyz="fade left-50% duration-15 delay-5">
            <div class="title">
                <h2 class="main-title" style="color: #dadde0; font-family: 'SSP-bold'">
                    Why Choose Buy Business Class?
                </h2>
            </div>
        </div>
        <div class="card xyz-in" xyz="fade left-50% duration-15 delay-5">
            <div class="card-left">
                <img
                    :src="require('@/assets/images/static/second.jpg')"
                    alt="Descrierea imaginii"
                    class="card-image"
                    loading="lazy"
                    decoding="async"
                />
            </div>
            <div class="card-right">
                <p class="card-text">
                    With over 7 years of expertise in the industry, our passionate team of travel specialists have
                    helped countless clients secure luxury business class experiences and affordable business and
                    first-class tickets to European destinations and beyond. <br /><br />
                    We offer exclusive business class offers and discount business class fares, ensuring you receive the
                    best possible value for your premium air travel. Our partnerships with all major airlines allow us
                    to offer competitive fares you won't find elsewhere.
                </p>
            </div>
        </div>
        <div class="services-section xyz-in" xyz="fade left-50% duration-15 delay-25">
            <h2 class="section-title">Our Services Include</h2>
            <div class="services-list">
                <div class="service-item">
                    <h3 class="service-number">01.</h3>
                    <div class="divider-container">
                        <div class="divider"></div>
                        <div class="circle"></div>
                        <div class="divider"></div>
                    </div>
                    <h4 class="service-title">Exclusive Business and First Class Deals</h4>
                    <p class="service-description">
                        Save up to 60% on Business Class flights through our airline agreements, providing cheap
                        business class tickets
                    </p>
                </div>

                <div class="service-item">
                    <h3 class="service-number">02.</h3>
                    <div class="divider-container">
                        <div class="divider"></div>
                        <div class="circle"></div>
                        <div class="divider"></div>
                    </div>
                    <h4 class="service-title">Custom Itineraries</h4>
                    <p class="service-description">
                        Tailor-made flight routes, whether it’s for multi-stop business trips or complex international
                        journeys.
                    </p>
                </div>

                <div class="service-item">
                    <h3 class="service-number">03.</h3>
                    <div class="divider-container">
                        <div class="divider"></div>
                        <div class="circle"></div>
                        <div class="divider"></div>
                    </div>
                    <h4 class="service-title">Upgrades & Priority Access</h4>
                    <p class="service-description">
                        Enjoy complimentary upgrades and priority booking on overbooked flights.
                    </p>
                </div>

                <div class="service-item">
                    <h3 class="service-number">04.</h3>
                    <div class="divider-container">
                        <div class="divider"></div>
                        <div class="circle"></div>
                        <div class="divider"></div>
                    </div>
                    <h4 class="service-title">24/7 Personalized Service</h4>
                    <p class="service-description">
                        Our travel consultants are available round-the-clock to provide assistance, ensuring a seamless
                        and worry-free experience.
                    </p>
                </div>

                <div class="service-item">
                    <h3 class="service-number">05.</h3>
                    <div class="divider-container">
                        <div class="divider"></div>
                        <div class="circle"></div>
                        <div class="divider"></div>
                    </div>
                    <h4 class="service-title">Complex Route Expertise</h4>
                    <p class="service-description">
                        Whether it’s a simple business trip or a complex itinerary, we specialize in getting you where
                        you need to go with efficiency.
                    </p>
                </div>
            </div>
        </div>
        <div style="padding-bottom: 5%; padding-top: 5%">
            <ReviewsVue />
        </div>
    </div>
</template>

<script>
import ReviewsVue from '../ReviewsVue.vue'

// Components

export default {
    components: { ReviewsVue },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.choose-description {
    margin-bottom: 80px;
    padding-top: 5%;

    > .title {
        @include block-title;

        > .main-title {
            > .capitalize {
                display: inline-block;
                white-space: nowrap;
                text-transform: capitalize;

                &::before {
                    content: '\00a0';
                }
            }
        }
    }

    > .content {
        color: #8e969e;
        padding-top: 50px;
        margin: 0 25%;
        line-height: 24px;
        font: {
            weight: 400;
            family: 'Inter', sans-serif;
        }
    }

    @media screen and (max-width: 768px) {
        > .title > .main-title {
            font: {
                weight: 400;
                family: 'Inter', sans-serif;
                size: 16px !important;
            }
        }

        > .content {
            margin: 0 16px;
            font-size: 14px; // Smaller content text size for tablets
        }
    }

    @media screen and (max-width: 480px) {
        > .title > .main-title {
            font: {
                weight: 400;
                family: 'Inter', sans-serif;
                size: 38px !important;
            }
        }

        > .content {
            font-size: 12px; // Smaller content text for mobile
        }
    }
}
.card {
    display: flex;
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 1000px;
    margin: 0 auto;
    background-color: #111; /* Pentru a potrivi cu fundalul din imagine */
}

.card-left {
    flex: 1; /* Ocupă același spațiu ca textul din dreapta */
}

.card-right {
    flex: 1; /* Ocupă același spațiu ca imaginea din stânga */
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eaeaea;
    text-align: center;
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ajustează imaginea să ocupe toată înălțimea și să păstreze proporțiile */
}

.services-section {
    padding: 40px;
    background-color: #111;
    color: white;
    text-align: center;
    padding-top: 10%;
    padding-bottom: 5%;
    background: url('@/assets/images/static/bg.png') no-repeat center center;
    background-size: cover;
}

.section-title {
    font-size: 45px;
    margin-bottom: 20px;
    padding-bottom: 40px;
    color: #dadde0;
}

.services-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
}

.service-item {
    background-color: #dadde0;
    color: #111;
    padding: 50px;
    max-width: 18%;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.service-item:hover {
    transform: translateY(-10px);
}

.service-number {
    font-size: 42px;
    color: #111;
    margin-bottom: 10px;
}

.service-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    font-family: 'Inter', sans-serif;
}

.service-description {
    font-size: 14px;
    color: #333;
    font-family: 'Inter', sans-serif;
}

.divider-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px; /* Spațiu între linie și cerc */
}

.divider {
    width: 100px; /* Lungimea fiecărui divider */
    height: 1px;
    background-color: #b4853b;
}

.circle {
    width: 20px;
    height: 20px;
    background-color: #b4853b; /* Culoare pentru cerc */
    border-radius: 50%; /* Face forma de cerc */
}

/* Stiluri pentru ecrane medii (tablete) */
@media (max-width: 1024px) {
    .services-list {
        justify-content: center;
        gap: 30px;
    }

    .service-item {
        max-width: 40%;
        padding: 30px;
    }

    .service-number {
        font-size: 36px;
    }

    .service-title {
        font-size: 16px;
    }

    .service-description {
        font-size: 13px;
    }

    .divider {
        width: 80px;
    }
}

/* Stiluri pentru ecrane mici (mobile) */
@media (max-width: 768px) {
    .services-list {
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .service-item {
        max-width: 90%;
        padding: 20px;
    }

    .service-number {
        font-size: 28px;
    }

    .service-title {
        font-size: 14px;
    }

    .service-description {
        font-size: 12px;
    }

    .divider {
        width: 60px;
    }

    .circle {
        width: 15px;
        height: 15px;
    }
}
</style>
