<template>
    <div>
        <div class="choose-description-apart">
            <div class="title">
                <h2 class="main-title" style="font-family: 'SSP-bold'">What Sets Us Apart?</h2>
            </div>
        </div>
        <div class="image-box-section">
            <div class="image-container">
                <img
                    :src="require('@/assets/images/static/second.webp')"
                    alt="Left Image"
                    loading="lazy"
                    decoding="async"
                />
            </div>
            <div class="box-container">
                <div class="box">
                    <span style="color: #f2f2f3; font-size: 18px; font-weight: bold">Tailor-made Experiences</span>
                    <p style="padding-top: 10px; font-family: 'Inter', sans-serif; font-size: 14px">
                        Unlike online travel agencies, we provide a bespoke service tailored to your needs.
                    </p>
                </div>
                <div class="box">
                    <span style="color: #f2f2f3; font-size: 18px; font-weight: bold">24/7 Live Customer Support</span>
                    <p style="padding-top: 10px; font-family: 'Inter', sans-serif; font-size: 14px">
                        We offer personalized support whenever you need it.
                    </p>
                </div>
                <div class="box">
                    <span style="color: #f2f2f3; font-size: 18px; font-weight: bold">Exclusive Access</span>
                    <p style="padding-top: 10px; font-family: 'Inter', sans-serif; font-size: 14px">
                        Benefit from privately negotiated contract fares with top airlines.
                    </p>
                </div>
                <div class="box">
                    <span style="color: #f2f2f3; font-size: 18px; font-weight: bold">Unmatched Expertise</span>
                    <p style="padding-top: 10px; font-family: 'Inter', sans-serif; font-size: 14px">
                        Our team’s combined 14+ years of industry experience means that we know the ins and outs of
                        business class travel.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Components

export default {
    components: {},
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';
.choose-description-apart {
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
    @media screen and (max-width: 768px) {
        padding-top: 30%;
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

.image-box-section {
    display: flex;
    justify-content: center;
    align-items: center; /* Aliniere verticală centrată pentru imagine și boxuri */
    gap: 40px; /* Spațiu între imagine și boxuri */
    padding: 40px; /* Spațiu general pentru întreaga secțiune */
}

.image-container img {
    max-width: 400px; /* Lățimea specificată pentru imagine */
    max-height: 900px; /* Înălțimea specificată pentru imagine */
    object-fit: cover; /* Ajustează pentru ca imaginea să se potrivească bine */
    border-radius: 8px; /* Colțuri rotunjite */
}

.box-container {
    display: flex;
    flex-direction: column; /* Boxurile sunt organizate vertical */
    justify-content: center;
    gap: 20px; /* Spațiu între boxuri */
    width: 20%;
}

.box {
    background-color: #b4853b; /* Culoare pentru boxuri */
    border: 1px solid #ccc;
    padding: 20px;
    text-align: center;
    border-radius: 8px; /* Colțuri rotunjite */
    flex: 1; /* Boxurile sunt flexibile și egale */
}

/* Stiluri pentru ecrane medii (tablete) */
@media (max-width: 1024px) {
    .image-box-section {
        flex-direction: column;
        gap: 20px; /* Reduce spațiul între elemente */
        padding: 20px;
    }

    .image-container img {
        max-width: 300px;
        max-height: 600px;
    }

    .box-container {
        width: 50%; /* Lărgește boxurile pe tablete */
    }

    .box {
        padding: 15px;
    }
}

/* Stiluri pentru ecrane mici (mobile) */
@media (max-width: 768px) {
    .image-box-section {
        flex-direction: column;
        padding: 10px;
        gap: 20px;
    }

    .image-container img {
        max-width: 100%; /* Imaginea ocupă întreaga lățime a ecranului pe mobile */
        max-height: 400px;
    }

    .box-container {
        width: 100%; /* Boxurile ocupă întreaga lățime pe mobil */
    }

    .box {
        padding: 10px;
    }
}
</style>
