<template>
    <div class="title-section">
        <h1 class="title">Premium Airlines Selected by BuyBusinessClass</h1>
        <p class="second-title">Scroll to Explore Our Top Airlines</p>
    </div>
    <div class="airlines-carousel">
        <Carousel
            :itemsToShow="3"
            :wrapAround="true"
            :mouseDrag="true"
            ref="carousel"
            @update="updateCurrentSlide"
            @init="startAutoplay"
            @destroy="stopAutoplay"
        >
            <Slide v-for="(airline, index) in airlines" :key="index" class="carousel-slide">
                <AirlineCard :airline="airline" />
            </Slide>
        </Carousel>
        <button class="carousel-prev" @click="prevSlide">‹</button>
        <button class="carousel-next" @click="nextSlide">›</button>
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import AirlineCard from './AirlineCard.vue'

export default {
    components: {
        Carousel,
        Slide,
        AirlineCard,
    },
    data() {
        return {
            airlines: [
                {
                    name: 'Emirates Airlines',
                    image: require('@/assets/images/static/emirates.webp'),
                    link: '/emirates',
                    slug: 'emirates',
                },
                {
                    name: 'Turkish Airlines',
                    image: require('@/assets/images/static/turkish.jpg'),
                    link: '/turkish',
                    slug: 'turkish',
                },
                {
                    name: 'Singapore Airlines',
                    image: require('@/assets/images/static/singapore.jpg'),
                    link: '/singapore',
                    slug: 'singapore',
                },
                {
                    name: 'Qatar Airways',
                    image: require('@/assets/images/static/qatar.jpg'),
                    link: '/qatar',
                    slug: 'qatar',
                },
                {
                    slug: 'etihad',
                    name: 'Etihad Airways',
                    image: require('@/assets/images/static/etihad.jpg'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'klm',
                    name: 'KLM',
                    image: require('@/assets/images/static/klm.jpg'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'iberia',
                    name: 'Iberia',
                    image: require('@/assets/images/static/iberia.jpg'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'hawaiian',
                    name: 'Hawaiian Airlines',
                    image: require('@/assets/images/static/hawai.jpg'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'american',
                    name: 'American Airlines',
                    image: require('@/assets/images/static/american.jpg'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'lufthansa',
                    name: 'Lufthansa',
                    image: require('@/assets/images/static/lufthansa.jpg'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'swiss',
                    name: 'Swiss Air',
                    image: require('@/assets/images/static/swiss.jpg'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'airserbia',
                    name: 'Air Serbia',
                    image: require('@/assets/images/static/serbia.webp'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'jordanianair',
                    name: 'Royal Jordanian',
                    image: require('@/assets/images/static/jordania.webp'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'philippine',
                    name: 'Philippine Airlines',
                    image: require('@/assets/images/static/philippine.webp'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'cathay',
                    name: 'Cathay Pacific',
                    image: require('@/assets/images/static/cathay.webp'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'jetblue',
                    name: 'JetBlue',
                    image: require('@/assets/images/static/jetblue.webp'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'qantas',
                    name: 'Qantas',
                    image: require('@/assets/images/static/qantas.webp'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'taportugal',
                    name: 'TAP Portugal',
                    image: require('@/assets/images/static/portugal.webp'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'aircanada',
                    name: 'Air Canada',
                    image: require('@/assets/images/static/canda.webp'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'saudi',
                    name: 'Saudi Arabian Airlines',
                    image: require('@/assets/images/static/saudi.jpg'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'korean',
                    name: 'Korean Air',
                    image: require('@/assets/images/static/korea.jpg'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'united',
                    name: 'United Airlines',
                    image: require('@/assets/images/static/united.jpg'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'airfrance',
                    name: 'Air France',
                    image: require('@/assets/images/static/france.webp'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'britishair',
                    name: 'British Airways',
                    image: require('@/assets/images/static/british.webp'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'ethiopianair',
                    name: 'Ethiopian Airlines',
                    image: require('@/assets/images/static/eth.jpg'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'latam',
                    name: 'LATAM Airlines',
                    image: require('@/assets/images/static/latam.jpg'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'finnair',
                    name: 'Finnair',
                    image: require('@/assets/images/static/fin.jpg'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'aireu',
                    name: 'Air Europa',
                    image: require('@/assets/images/static/eu.webp'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'austrianair',
                    name: 'Austrian Airlines',
                    image: require('@/assets/images/static/austria.jpg'),
                    details: 'Details about Etihad Airways',
                },
                {
                    slug: 'delta',
                    name: 'Delta Air Lines',
                    image: require('@/assets/images/static/delta.jpg'),
                    details: 'Details about Etihad Airways',
                },
            ],
            currentSlide: 0,
            autoplayInterval: null, // Interval ID for autoplay
            autoplayDelay: 3000, // Time in milliseconds
        }
    },
    methods: {
        prevSlide() {
            try {
                if (this.$refs.carousel) {
                    this.$refs.carousel.prev()
                }
            } catch (error) {
                console.error('Error in prevSlide:', error)
            }
        },
        nextSlide() {
            try {
                if (this.$refs.carousel) {
                    this.$refs.carousel.next()
                }
            } catch (error) {
                console.error('Error in nextSlide:', error)
            }
        },
        goToSlide(index) {
            try {
                if (this.$refs.carousel && this.$refs.carousel.goTo) {
                    this.$refs.carousel.goTo(index)
                }
            } catch (error) {
                console.error('Error in goToSlide:', error)
            }
        },
        updateCurrentSlide(index) {
            this.currentSlide = index
        },
        startAutoplay() {
            this.autoplayInterval = setInterval(() => {
                this.nextSlide()
            }, this.autoplayDelay)
        },
        stopAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval)
            }
        },
        beforeDestroy() {
            this.stopAutoplay()
        },
    },
}
</script>

<style scoped>
.airlines-carousel {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-top: 50px;
}

.carousel-prev,
.carousel-next {
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 20px;
    cursor: pointer;
    z-index: 10;
    font-size: 1.5em;
}

.carousel-prev {
    left: 10%;
}

.carousel-next {
    right: 10%;
}

.carousel-prev:hover,
.carousel-next:hover {
    background: rgba(0, 0, 0, 0.8);
}

.carousel-indicators {
    display: flex;
    justify-content: center;
    margin-top: 10px; /* Adjust spacing between carousel and indicators */
}

.indicator {
    width: 10px;
    height: 10px;
    background-color: #ddd;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.indicator.active {
    background-color: #333;
}

.carousel-slide {
    margin: 0 10px;
}

.carousel {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
}

.airline-card {
    cursor: pointer;
    text-align: center;
}

.airline-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.airline-name {
    margin-top: 10px;
    color: #fff;
    font-size: 1.2em;
    font-weight: bold;
    font-family: 'SSP-bold';
}

.title-section {
    padding-top: 10%;
    text-align: center;
    font-family: 'SSP-bold';
    > .title {
        color: #fff;
    }
    > .second-title {
        color: #bebcbc;
        font-family: 'SSP-bold';
    }
}
.airline-card:hover {
    transition:
        transform 0.3s,
        box-shadow 0.3s;
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

/* Stiluri specifice pentru ecrane mici */
@media (max-width: 768px) {
    .airlines-carousel {
        display: flex;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        gap: 15px;
    }

    .carousel-slide {
        flex: 0 0 80%;
        scroll-snap-align: start;
        margin-right: 10px;
        max-width: 60%;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        background-color: white;
    }

    .airline-card {
        text-align: center;
    }

    .airline-image {
        width: 100%;
        height: auto;
        max-height: 100px;
        object-fit: contain;
    }

    .carousel-prev,
    .carousel-next {
        display: none;
    }
}

@media (max-width: 992px) {
    .carousel-slide {
        margin: 0 5px;
    }

    .carousel {
        max-width: 100%;
    }
}

@media (max-width: 576px) {
    .carousel-slide {
        margin: 0 2px;
    }

    .airline-card {
        padding: 10px;
    }

    .airline-image {
        border-radius: 5px;
    }

    .airline-name {
        font-size: 1em;
    }

    .title-section {
        padding-top: 25%;
    }

    .title-section .title {
        font-size: 1.5em;
    }

    .title-section .second-title {
        font-size: 1em;
    }
}
</style>
