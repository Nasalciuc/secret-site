<template>
    <div class="footer-container">
        <h2 class="footer-text">
            {{ title }}
        </h2>
        <h2 class="footer-text-description pb">
            {{ description }}
        </h2>
    </div>
</template>

<script>
export default {
    name: 'DynamicFooterText',
    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
}
</script>

<style scoped>
.footer-text {
    text-align: center;
    color: rgb(202, 200, 200);
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 24px;
    line-height: 2;
    margin: 0 16px;
}

.footer-text-description {
    color: rgb(202, 200, 200);
    text-align: center;
    font-family: 'Inter', sans-serif;
    line-height: 2;
    max-width: 1000px;
    margin: 16px auto 0 auto;
    font-size: 16px;
    padding: 0 16px;
}

.pb {
    padding-bottom: 50px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .footer-text {
        font-size: 20px;
        line-height: 1.6;
    }

    .footer-text-description {
        font-size: 14px;
        line-height: 1.8;
        padding: 0 12px;
    }
}

@media (max-width: 480px) {
    .footer-text {
        font-size: 18px;
    }

    .footer-text-description {
        font-size: 13px;
        padding: 0 10px;
    }
}
</style>
