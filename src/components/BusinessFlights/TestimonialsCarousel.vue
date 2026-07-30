<template>
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
            <Slide v-for="(testimonial, index) in testimonials" :key="index" class="carousel-slide">
                <TestimonialCard :testimonial="testimonial" />
            </Slide>
        </Carousel>
        <button class="carousel-prev" @click="prevSlide">‹</button>
        <button class="carousel-next" @click="nextSlide">›</button>
    </div>
    <div class="trust-bg">
        <img
            :src="require('@/assets/images/static/trust-bg.png')"
            alt="Imagine"
            class="trust-image"
            loading="lazy"
            decoding="async"
        />
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import TestimonialCard from './TestimonialCard.vue'

export default {
    components: {
        Carousel,
        Slide,
        TestimonialCard,
    },
    data() {
        return {
            testimonials: [
                {
                    name: 'Jacob M',
                    location: 'US',
                    date: 'October 18, 2024',
                    text: 'Agent speaks fluent English. Understands customer needs. She is patient and empathetic with the customer. Over the years I have used other Airline Wholesalers and discounters...',
                },
                {
                    name: 'Terri B',
                    location: 'US',
                    date: 'July 31, 2024',
                    text: 'Gio was great! Very responsive. Gave us multiple flight and cabin preferences…made the process seamless!! And of course, can’t beat the discounted fares!',
                },
                {
                    name: 'Ling Bundgaard',
                    location: 'DK',
                    date: 'August 13, 2024',
                    text: 'Buy business class Andrew Vale gave excellent service by providing me options and doing his homework. His follow up and attention to detail helped me finalize the flight quickly !',
                },
                {
                    name: 'Naveen Kapoor',
                    location: 'US',
                    date: 'October 28, 2024',
                    text: 'Emma the sales person was very diligent and patient. We had a multi city booking with strict guidelines. She understood and delivered.',
                },
                {
                    name: 'Laila',
                    location: 'US',
                    date: 'October 27, 2024',
                    text: 'Mason Hunter was very helpful and attentive to all my requests. Took a personal interest in getting me the best possible flight.',
                },
                {
                    name: 'David Wayner',
                    location: 'US',
                    date: 'October 15, 2024',
                    text: 'I just booked a trip, at a time that was quickly getting booked up for the holidays. Alice Dante, of "Buy Business Class", patiently pursued various schedules and airlines to get the optimal combination, as availability was disappearing.',
                },
                {
                    name: 'Vinay Chandrra',
                    location: 'US',
                    date: 'October 4, 2024',
                    text: 'I leveraged BuyBusinessClass for flights to India in December (Peak season). Worked with Veer and he is great to work with. He was able to get me great options at an unbelievable price. I will recommend this to anyone that would like to fly business class at an extremely affordable price point',
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
        max-width: 40%;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        background-color: rgb(0, 0, 0);
    }

    .airline-card {
        text-align: center;
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
.trust-bg {
    display: flex;
    justify-content: center; /* Centrează orizontal */
    align-items: center; /* Centrează vertical */
    margin-top: 50px;
}

.trust-image {
    max-width: 100%; /* Asigură-te că imaginea nu depășește containerul */
    height: auto;
}
</style>
