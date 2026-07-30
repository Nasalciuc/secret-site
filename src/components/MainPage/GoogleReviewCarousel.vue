<template>
    <div class="carousel-wrapper">
        <!-- Săgeată stânga -->
        <button class="nav-button left" @click="goPrev" aria-label="Previous">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>

        <!-- Carouselul -->
        <Carousel
            ref="carousel"
            :items-to-show="3"
            :wrap-around="true"
            :transition="600"
            :breakpoints="breakpoints"
            class="custom-carousel"
        >
            <Slide v-for="(review, index) in reviews" :key="index">
                <div class="review-card">
                    <div class="review-header">
                        <img :src="review.avatar" alt="Avatar" class="avatar" loading="lazy" decoding="async" />
                        <div class="user-info">
                            <strong>{{ review.name }}</strong>
                            <div class="meta">{{ review.details }}</div>
                            <div class="rating">
                                <span class="stars">⭐️⭐️⭐️⭐️⭐️</span>
                                <span class="time">{{ review.time }}</span>
                                <span class="badge">NEW</span>
                            </div>
                        </div>
                    </div>
                    <p class="review-text">“{{ review.text }}”</p>
                </div>
            </Slide>
        </Carousel>

        <!-- Săgeată dreapta -->
        <button class="nav-button right" @click="goNext" aria-label="Next">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'

const carousel = ref(null)

const goPrev = () => {
    if (carousel.value) carousel.value.prev()
}
const goNext = () => {
    if (carousel.value) carousel.value.next()
}
let interval = null

const reviews = ref([]) // inițializăm ca ref

const originalReviews = [
    {
        name: 'Sally Gutierrez',
        details: '8 reviews · 1 photo',
        time: 'a week ago',
        text: 'BuyBusiness was very easy to work with and their prices were great. Also, Chris did an outstanding job assisting me with my travel plans.',
        avatar: 'https://i.pravatar.cc/60?img=48',
    },
    {
        name: 'Norm Nelson',
        details: '9 reviews · 1 photos',
        time: '2 weeks ago',
        text: 'Tyke once again did a great job for me. He was fast, responsive, courteous, professional and highly skilled. He found the best possible route for the best possible price.',
        avatar: 'https://i.pravatar.cc/60?img=12',
    },
    {
        name: 'Dee Setchel',
        details: '12 reviews',
        time: '2 months ago',
        text: 'I received 4 different itineraries and prices for flights to Europe within minutes of speaking to Dennis...great service! I was very pleased with the choices, and the one I selected seemed like a great deal (I had researched prices on my own online before getting these quotes.) Very pleased with Buy Business based on this experience.',
        avatar: 'https://i.pravatar.cc/60?img=14',
    },
    {
        name: 'Jersey Kate',
        details: '1 review',
        time: '3 weeks ago',
        text: 'Mahi offered several options for my plans and I purchased an itinerary that is definitely a value compared to other quotes. Also, he was patient with my multiple calls/requests. Good work!',
        avatar: 'https://i.pravatar.cc/60?img=13',
    },
    {
        name: 'Harry Steinke',
        details: '1 review',
        time: '3 month ago',
        text: 'It was a wonderful experience working with Sara. She quickly grasped our travel desires and was able to get us wonderful flights to and from Kenya at a very reasonable price.',
        avatar: 'https://i.pravatar.cc/60?img=23',
    },
    {
        name: 'Clinton Zimmer',
        details: '14 reviews',
        time: '2 month ago',
        text: 'The laborious task of sorting through numerous offers was unbelievable. One trip was approved only to find another replaced it but for less money per ticket. Adding a tip was very unusual. The trip experience will hopefully be pleasant.',
        avatar: 'https://i.pravatar.cc/60?img=28',
    },
]
function shuffle(array) {
    const copy = [...array]
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
}
let currentIndex = 0

onMounted(() => {
    reviews.value = shuffle(originalReviews)

    interval = setInterval(() => {
        carousel.value?.next()
        currentIndex++

        if (currentIndex >= reviews.value.length) {
            currentIndex = 0
            reviews.value = shuffle(originalReviews)
        }
    }, 7000)
})
onUnmounted(() => {
    clearInterval(interval)
})

const breakpoints = {
    0: { itemsToShow: 1 }, // telefoane
    768: { itemsToShow: 1 }, // tablete mici
    1024: { itemsToShow: 2 }, // tablete mari
    1400: { itemsToShow: 3 }, // desktop
}
</script>

<style scoped>
.carousel-wrapper {
    position: relative;
    max-width: 1300px;
    margin: 0 auto;
    padding: 2rem 0;
}

.review-card {
    background-color: #fff;
    height: 100%;
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    padding: 20px 25px;
    margin: 10px;
    min-height: 200px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.review-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-right: 15px;
}

.user-info {
    font-family: 'inter';
    flex: 1;
}

.meta {
    font-family: 'inter';
    font-size: 0.9rem;
    color: #777;
}

.rating {
    font-size: 0.9rem;
    color: #333;
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 2px;
}

.stars {
    color: #fbbc04;
}

.badge {
    background-color: #e5f0ff;
    color: #1a73e8;
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 4px;
}

.review-text {
    font-family: 'inter';
    font-size: 0.9rem;
    color: #444;
    margin-top: 10px;
}
.nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    border: 1px solid #ddd;
    border-radius: 50%;
    padding: 8px;
    z-index: 10;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}
.nav-button:hover {
    background-color: #f0f0f0;
}
.nav-button.left {
    left: -50px;
}
.nav-button.right {
    right: -50px;
}
@media (max-width: 768px) {
    .nav-button {
        width: 30px;
        height: 30px;
        padding: 6px;
    }

    .nav-button svg {
        width: 18px;
        height: 18px;
    }

    .nav-button.left {
        left: -10px;
    }

    .nav-button.right {
        right: -10px;
    }
}
</style>
