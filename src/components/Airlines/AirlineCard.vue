<template>
    <div class="airline-card" @click="goToAirline">
        <img :src="airline.image" :alt="airline.name" class="airline-image" loading="lazy" decoding="async" />
        <div class="airline-name">{{ airline.name }}</div>
    </div>
</template>

<script>
export default {
    props: {
        airline: {
            type: Object,
            required: true,
        },
    },
    methods: {
        goToAirline() {
            if (this.airline.slug) {
                this.$router.push({ name: 'AirlineDetail', params: { slug: this.airline.slug } })
            } else {
                console.error('Slug is missing for airline:', this.airline)
            }
        },
    },
}
</script>

<style scoped>
.airline-card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: white;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.airline-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 8px;
}

.airline-name {
    margin-top: 10px;
    font-size: 1em;
    font-weight: bold;
    color: black;
    padding-bottom: 10px;
    font-family: 'SSP-bold';
}
@media (max-width: 768px) {
    .airline-name {
        font-size: 12px;
    }
}
</style>
