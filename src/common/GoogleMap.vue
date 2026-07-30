<template>
    <div class="google-map">
        <img
            :src="require('@/assets/images/static/harta.webp')"
            width="500"
            height="450"
            alt="Google Map"
            loading="lazy"
            decoding="async"
        />
        <!--<iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2982.884738704084!2d-88.15390458758668!3d41.61500407115217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e5f970b3cd2fd%3A0x17a85f9ef49ee34b!2s220%20Stamford%20Ln!5e0!3m2!1sen!2s!4v1692892391005!5m2!1sen!2s"
            width="500"
            height="450"
            allowfullscreen="true"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        ></iframe>-->
    </div>
</template>

<style lang="scss">
.google-map {
    width: fit-content;

    > iframe {
        border-radius: 16px;
    }
}
</style>
