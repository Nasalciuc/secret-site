<template>
    <div class="testimonial-card">
        <div class="testimonial-header">
            <h3>{{ testimonial.name }}</h3>
            <div class="trustpilot-stars">
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
            </div>
        </div>
        <div class="testimonial-location">
            <img
                :src="require('@/assets/images/static/loc.png')"
                alt="Location Icon"
                class="location-icon"
                loading="lazy"
                decoding="async"
            />
            <span>{{ testimonial.location }}</span>
            <div class="testimonial-calendar">
                <img
                    :src="require('@/assets/images/static/calendar.png')"
                    alt="Calendar Icon"
                    class="calendar-icon"
                    loading="lazy"
                    decoding="async"
                />
                <span>{{ testimonial.date }}</span>
            </div>
        </div>
        <div class="testimonial-text">{{ testimonial.text }}</div>
    </div>
</template>

<script>
export default {
    props: {
        testimonial: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style scoped>
.testimonial-card {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: white;
    width: 100%;
    height: auto;
    border: 1px solid white;
    min-height: 100%;
}
.testimonial-header h3 {
    font-size: 24px;
}

@media (max-width: 768px) {
    .testimonial-text {
        font-size: 12px;
    }
}
.testimonial-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
}

.trustpilot-stars {
    margin-left: 10px;
}

.star {
    color: gold;
    font-size: 20px;
}
.testimonial-location {
    display: flex;
    align-items: center;
    justify-content: center;
}

.location-icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
}
.calendar-icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
}
.testimonial-calendar {
    display: flex;
    align-items: center;
    padding-left: 25px;
}
.testimonial-text {
    padding-top: 25px;
    color: #8e969e;
    line-height: 24px;
    font-weight: 400;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    padding-bottom: 25px;
    margin: 30px;
}
@media (max-width: 768px) {
    .testimonial-card {
        padding: 15px;
    }

    .testimonial-header h3 {
        font-size: 18px;
    }

    .testimonial-text {
        font-size: 12px;
        margin: 0 10px;
    }

    .testimonial-location {
        font-size: 12px;
    }
}

@media (max-width: 480px) {
    .testimonial-card {
        padding: 10px;
    }

    .testimonial-header h3 {
        font-size: 14px;
    }

    .star {
        font-size: 16px;
    }

    .testimonial-text {
        font-size: 11px;
        margin: 0 5px;
    }
}
</style>
