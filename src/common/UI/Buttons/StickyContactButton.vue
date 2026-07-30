<template>
    <div>
        <button class="btn-container" :class="{ 'is-desktop': isDesktop, 'is-mobile': isMobile }">
            <a href="tel:+18883227999">
                <!-- SVG Phone Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="phone-icon" aria-hidden="true">
                    <path
                        fill="currentColor"
                        d="M6.62,10.79A15.561,15.561,0,0,0,13.21,17.38l1.74-1.74a1,1,0,0,1,.85-.27,11.759,11.759,0,0,0,3.71.61,1,1,0,0,1,1,1v3.52a1,1,0,0,1-1,1C11.28,22,2,12.72,2,4A1,1,0,0,1,3,3H6.52a1,1,0,0,1,1,1,11.762,11.762,0,0,0,.61,3.71,1,1,0,0,1-.27.85Z"
                    />
                </svg>
                Call Us: +1 (888) 322-7999
            </a>
        </button>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
    name: 'StickyButton',
    setup() {
        const isDesktop = ref(window.innerWidth >= 768) // presupunem că 768px este pragul pentru desktop
        const isMobile = ref(window.innerWidth < 768)

        const handleResize = () => {
            isDesktop.value = window.innerWidth >= 768
            isMobile.value = window.innerWidth < 768
        }
        onMounted(() => {
            window.addEventListener('resize', handleResize)
        })
        onUnmounted(() => {
            window.removeEventListener('resize', handleResize)
        })
        return { isDesktop, isMobile }
    },
}
</script>
<style lang="scss" scoped>
.btn-container {
    position: fixed;
    bottom: 20px;
    padding: 15px;
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    z-index: 1000;
    background-color: #d1cece;
    overflow: hidden;
    border-radius: 10px;
    animation: glow-border 1.5s infinite; /* Continuous glow animation */
}

.btn-container a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    overflow: hidden;
    font-size: 14px;
    color: #000; /* Black text color for contrast */
    font-weight: lighter; /* Adjusted font weight */
    letter-spacing: 1px; /* Slight letter spacing */
    z-index: 1;
    font-family: Arial, Helvetica, sans-serif;
    transition: 0.5s;
    backdrop-filter: blur(15px);
}

.btn-container:hover a {
    letter-spacing: 3px; /* Expand letter spacing on hover */
}

.btn-container::before {
    bottom: -5px;
}

.btn-container:hover::before {
    bottom: 0;
    height: 60%; /* Adjusted height */
    width: 90%; /* Adjusted width */
    border-radius: 30px;
}

.btn-container::after {
    top: -5px;
}

.btn-container:hover::after {
    top: 0;
    height: 60%; /* Adjusted height */
    width: 90%; /* Adjusted width */
    border-radius: 30px;
}

.btn-container.is-desktop {
    left: 50%;
    transform: translateX(-50%);
}

.btn-container.is-mobile {
    left: 20px;
    width: 50px;
    height: 50px;
    padding: 10px;
    border-radius: 50%; /* Circular shape for mobile */
}

.btn-container.is-mobile a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 0; /* Hide text on mobile */
}

.btn-container.is-mobile a .phone-icon {
    width: 30px; /* SVG size for mobile */
    height: 30px;
    margin: 0; /* Remove margin */
    display: block;
}

/* Keyframes for continuous glow effect */
@keyframes glow-border {
    0%,
    100% {
        box-shadow:
            0 0 10px #b4853b,
            0 0 20px #b4853b;
    }
    50% {
        box-shadow:
            0 0 20px #b4853b,
            0 0 40px #b4853b;
    }
}
@keyframes glow-border-mobile {
    0%,
    100% {
        box-shadow:
            0 0 20px #b4853b,
            0 0 40px #b4853b,
            0 0 60px #b4853b,
            0 0 100px #b4853b;
    }
    50% {
        box-shadow:
            0 0 40px #b4853b,
            0 0 80px #b4853b,
            0 0 100px #b4853b,
            0 0 200px #b4853b;
    }
}
.btn-container a .phone-icon {
    width: 24px; /* Adjust the width of the SVG */
    height: 24px; /* Adjust the height of the SVG */
    margin-right: 8px; /* Space between the SVG and text */
    display: none;
}
</style>
