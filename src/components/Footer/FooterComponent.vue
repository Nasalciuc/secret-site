<template>
    <div class="footer-container">
        <h2
            style="
                text-align: center;
                color: #6f767e;
                font-family: Inter, sans-serif;
                font-weight: 400;
                font-size: 15px;
                line-height: 2;
            "
        >
            Business Class Travel Agent | First Class Airfare | Book Business Class Airline Tickets | Discount Business
            Class Flights | Deals On Business Class Flights
        </h2>
        <h2
            style="
                text-align: center;
                color: #6f767e;
                font-family: Inter, sans-serif;
                font-weight: 400;
                font-size: 15px;
                line-height: 2;
                padding-bottom: 50px;
            "
        >
            Cheap Business Class Airfare | Discount Business Class Travel | Deals On Business Class Flights | Flight
            Deals Business Class | Business Class Flight Tickets | Cheap Business Class Air Tickets
        </h2>
        <airlines-logos />
        <div class="text-info">
            <p>
                *All the fares displayed are in USD and include all taxes, fees and applicable surcharges. All prices
                are per person, based on business and first class weekday travel (Monday – Thursday) from the USA, and
                depend on the chosen class of service, departure city, airline and the route (lowest transatlantic fares
                are usually from the East Coast; transpacific fares – from the West Coast). The maximum allowable stay
                is six months. Please call our toll-free line for current best prices and additional details. Savings up
                to 60% off are indicated off the full unrestricted published airfares of major airlines and may vary
                based on individual fare rules. Some airlines may impose additional baggage charges. The fares are
                subject to seat availability in the corresponding booking inventory. Seats are limited and may not be
                available on all flights and dates. The fares are non-refundable, non-exchangeable, and
                non-transferable. The fares and their governing rules are subject to change without prior notice. Other
                restrictions may apply. Less restrictive fares available at different rates.
            </p>
        </div>
        <div class="icons-block">
            <svg-container class="services-logo" />
            <img
                width="50"
                height="50"
                class="secure-3d"
                :src="require('@/assets/images/static/3d-secure.jpeg')"
                alt="3d secure"
                loading="lazy"
                decoding="async"
            />
            <div class="payment">
                <svg
                    class="card-icon"
                    width="34"
                    height="22"
                    viewBox="0 0 34 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M20.8843 6.70508C19.0619 6.70508 17.4333 7.64968 17.4333 9.3949C17.4333 11.3963 20.3217 11.5346 20.3217 12.5401C20.3217 12.9634 19.8365 13.3424 19.0078 13.3424C17.8318 13.3424 16.9529 12.8128 16.9529 12.8128L16.5768 14.574C16.5768 14.574 17.5893 15.0213 18.9336 15.0213C20.9261 15.0213 22.494 14.0303 22.494 12.2552C22.494 10.1403 19.5936 10.0062 19.5936 9.07297C19.5936 8.74132 19.9918 8.37794 20.8181 8.37794C21.7504 8.37794 22.511 8.76307 22.511 8.76307L22.8791 7.06212C22.8791 7.06212 22.0515 6.70508 20.8843 6.70508V6.70508ZM4.2108 6.83345L4.16667 7.0902C4.16667 7.0902 4.93337 7.23052 5.62391 7.51042C6.51304 7.83139 6.57637 8.01824 6.72612 8.59859L8.35786 14.8889H10.5452L13.915 6.83345H11.7327L9.56738 12.3104L8.68381 7.66788C8.60278 7.13655 8.19233 6.83345 7.68992 6.83345H4.2108V6.83345ZM14.7926 6.83345L13.0806 14.8889H15.1617L16.8676 6.83345H14.7926V6.83345ZM26.3993 6.83345C25.8975 6.83345 25.6317 7.10212 25.4365 7.5716L22.3877 14.8889H24.57L24.9923 13.6693H27.651L27.9077 14.8889H29.8333L28.1535 6.83345H26.3993V6.83345ZM26.6832 9.00978L27.3301 12.0326H25.597L26.6832 9.00978V9.00978Z"
                        fill="white"
                    />
                </svg>
                <svg
                    class="card-icon"
                    width="34"
                    height="22"
                    viewBox="0 0 34 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17 5.89844C15.5158 7.07391 14.5645 8.8922 14.5645 10.935C14.5645 12.9778 15.5158 14.7961 17 15.9716C18.4843 14.7961 19.4355 12.9778 19.4355 10.935C19.4355 8.8922 18.4843 7.07391 17 5.89844Z"
                        fill="white"
                    />
                    <path
                        d="M16.4865 16.341C14.9388 15.0524 13.9534 13.1091 13.9534 10.9343C13.9534 8.7594 14.9388 6.81619 16.4865 5.52756C15.4913 4.88828 14.3067 4.51367 13.0317 4.51367C9.48255 4.51367 6.61111 7.38511 6.61111 10.9343C6.61111 14.4834 9.48255 17.3549 13.0317 17.3549C14.3067 17.3549 15.4913 16.9803 16.4865 16.341Z"
                        fill="white"
                    />
                    <path
                        d="M20.9683 17.3549C24.5175 17.3549 27.3889 14.4834 27.3889 10.9343C27.3889 7.40294 24.5175 4.51367 20.9683 4.51367C19.6933 4.51367 18.5088 4.88828 17.5136 5.52756C19.0612 6.81619 20.0466 8.75941 20.0466 10.9343C20.0466 13.1091 19.0612 15.0524 17.5135 16.341C18.5088 16.9803 19.6933 17.3549 20.9683 17.3549Z"
                        fill="white"
                    />
                </svg>
                <svg
                    class="card-icon"
                    width="34"
                    height="22"
                    viewBox="0 0 34 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0_185_5245)">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M33.1822 16.316V18.7067H30.1462L29.0242 17.394L27.8582 18.7067H19.2342V11.718H16.3889L19.9456 3.66602H23.4069L24.2429 5.49201V3.66602H28.5402L29.2589 5.58002L29.9629 3.66602H33.1822V4.80267H30.6962L29.5669 7.78003L29.2662 8.58667L27.8216 4.80267H25.3356V10.6693L22.7542 4.80267H20.7522L18.1562 10.6693H19.8576L20.3122 9.54002H23.1576L23.6122 10.6693H25.3356H26.8316V6.84868L26.8242 6.07867L27.1176 6.84868L28.5476 10.6693H29.9702L31.4076 6.84868L31.6862 6.08601V10.6693H33.1822V12.9647L31.5249 14.6293L33.1822 16.316ZM20.4369 17.57V11.7253H25.3356V12.994H21.9329V14.0207H25.2696V15.282H21.9329V16.3013H25.3356V17.57H20.4369ZM32.7276 17.57H30.7842L29.0096 15.6633L27.2276 17.57H25.3356L28.0709 14.6587L25.3356 11.7253H27.2862L29.0462 13.6247L30.8136 11.7253H32.7276L29.9849 14.6367L32.7276 17.57Z"
                            fill="white"
                        />
                        <path
                            d="M21.7349 6.05667L21.4416 6.79003L20.8329 8.27132H22.6369L22.0282 6.79003L21.7349 6.05667Z"
                            fill="white"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_185_5245">
                            <rect x="0.5" width="33" height="22" rx="2" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <svg
                    class="card-icon"
                    width="34"
                    height="22"
                    viewBox="0 0 34 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0_185_5251)">
                        <path d="M33.5 14.666C33.5 14.666 26.1612 19.729 12.7222 21.9993H33.5V14.666Z" fill="white" />
                        <path
                            d="M4.23193 8.49414H2.94446V13.0044H4.23193C4.91257 13.0044 5.4046 12.8404 5.83922 12.4878C6.35585 12.0613 6.65927 11.4217 6.65927 10.7575C6.65107 9.42079 5.65881 8.49414 4.23193 8.49414ZM5.26519 11.8891C4.98637 12.1351 4.63375 12.25 4.05972 12.25H3.82191V9.26498H4.05972C4.62555 9.26498 4.96997 9.36339 5.26519 9.6258C5.56861 9.89642 5.74902 10.3146 5.74902 10.7493C5.74902 11.1839 5.56861 11.6185 5.26519 11.8891Z"
                            fill="white"
                        />
                        <path d="M7.93848 8.49414H7.06104V13.0044H7.93848V8.49414Z" fill="white" />
                        <path
                            d="M10.087 10.2256C9.5622 10.0288 9.4064 9.89757 9.4064 9.65976C9.4064 9.37274 9.68521 9.15953 10.0624 9.15953C10.3248 9.15953 10.5463 9.26613 10.7677 9.52855L11.2269 8.92992C10.8497 8.6019 10.3987 8.42969 9.89842 8.42969C9.10298 8.42969 8.48794 8.98732 8.48794 9.72536C8.48794 10.3486 8.77496 10.6684 9.59501 10.9636C9.93943 11.0866 10.1116 11.1686 10.2018 11.2178C10.374 11.3327 10.4643 11.4967 10.4643 11.6853C10.4643 12.0543 10.1772 12.3249 9.78362 12.3249C9.36539 12.3249 9.02917 12.1117 8.82416 11.7263L8.25833 12.2757C8.66015 12.8743 9.15218 13.1368 9.81642 13.1368C10.7267 13.1368 11.3745 12.5299 11.3745 11.6525C11.3909 10.9226 11.0875 10.5946 10.087 10.2256Z"
                            fill="white"
                        />
                        <path
                            d="M11.6616 10.7582C11.6616 12.0867 12.7031 13.1117 14.0398 13.1117C14.417 13.1117 14.745 13.0379 15.1386 12.8493V11.8161C14.786 12.1687 14.4744 12.3081 14.0808 12.3081C13.1951 12.3081 12.5637 11.6685 12.5637 10.75C12.5637 9.88077 13.2115 9.20013 14.0398 9.20013C14.458 9.20013 14.7778 9.34774 15.1386 9.70856V8.6753C14.7532 8.47849 14.4334 8.39648 14.0562 8.39648C12.7359 8.39648 11.6616 9.44614 11.6616 10.7582Z"
                            fill="white"
                        />
                        <path
                            d="M22.1253 11.5283L20.9199 8.49414H19.9604L21.8711 13.1192H22.3468L24.2903 8.49414H23.339L22.1253 11.5283Z"
                            fill="white"
                        />
                        <path
                            d="M24.6921 13.0044H27.185V12.2417H25.5695V11.0281H27.1276V10.2654H25.5695V9.26498H27.185V8.49414H24.6921V13.0044Z"
                            fill="white"
                        />
                        <path
                            d="M30.6702 9.83043C30.6702 8.98578 30.0879 8.50195 29.0711 8.50195H27.7672V13.0122H28.6447V11.1999H28.7595L29.9731 13.0122H31.0556L29.6369 11.1097C30.3012 10.9703 30.6702 10.5193 30.6702 9.83043ZM28.8989 10.5767H28.6447V9.20719H28.9153C29.4647 9.20719 29.7599 9.43681 29.7599 9.87963C29.7599 10.3307 29.4647 10.5767 28.8989 10.5767Z"
                            fill="white"
                        />
                        <path
                            d="M17.8364 13.1687C19.1634 13.1687 20.2391 12.093 20.2391 10.766C20.2391 9.43902 19.1634 8.36328 17.8364 8.36328C16.5094 8.36328 15.4336 9.43902 15.4336 10.766C15.4336 12.093 16.5094 13.1687 17.8364 13.1687Z"
                            fill="white"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_185_5251">
                            <rect x="0.5" width="33" height="22" rx="2" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
        <div class="socials">
            <a target="_blank" :href="facebookPageUrl">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978c.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036a26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103l-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647"
                    />
                </svg>
            </a>
            <a target="_blank" :href="twitterPageUrl">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128">
                    <path
                        fill="currentColor"
                        d="M75.916 54.2L122.542 0h-11.05L71.008 47.06L38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303L89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086l-39.42-56.386h16.972L65.19 53.824l4.954 7.086l41.353 59.15h-16.97L60.782 71.793Z"
                    />
                </svg>
            </a>
            <a target="_blank" :href="linkedinPageUrl">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"
                    />
                </svg>
            </a>
            <a target="_blank" :href="instagramPageUrl">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M7.03.084c-1.277.06-2.149.264-2.91.563a5.874 5.874 0 0 0-2.124 1.388a5.878 5.878 0 0 0-1.38 2.127C.321 4.926.12 5.8.064 7.076C.008 8.354-.005 8.764.001 12.023c.007 3.259.021 3.667.083 4.947c.061 1.277.264 2.149.563 2.911c.308.789.72 1.457 1.388 2.123a5.872 5.872 0 0 0 2.129 1.38c.763.295 1.636.496 2.913.552c1.278.056 1.689.069 4.947.063c3.257-.007 3.668-.021 4.947-.082c1.28-.06 2.147-.265 2.91-.563a5.881 5.881 0 0 0 2.123-1.388a5.881 5.881 0 0 0 1.38-2.129c.295-.763.496-1.636.551-2.912c.056-1.28.07-1.69.063-4.948c-.006-3.258-.02-3.667-.081-4.947c-.06-1.28-.264-2.148-.564-2.911a5.892 5.892 0 0 0-1.387-2.123a5.857 5.857 0 0 0-2.128-1.38c-.764-.294-1.636-.496-2.914-.55C15.647.009 15.236-.006 11.977 0C8.718.008 8.31.021 7.03.084m.14 21.693c-1.17-.05-1.805-.245-2.228-.408a3.736 3.736 0 0 1-1.382-.895a3.695 3.695 0 0 1-.9-1.378c-.165-.423-.363-1.058-.417-2.228c-.06-1.264-.072-1.644-.08-4.848c-.006-3.204.006-3.583.061-4.848c.05-1.169.246-1.805.408-2.228c.216-.561.477-.96.895-1.382a3.705 3.705 0 0 1 1.379-.9c.423-.165 1.057-.361 2.227-.417c1.265-.06 1.644-.072 4.848-.08c3.203-.006 3.583.006 4.85.062c1.168.05 1.804.244 2.227.408c.56.216.96.475 1.382.895c.421.42.681.817.9 1.378c.165.422.362 1.056.417 2.227c.06 1.265.074 1.645.08 4.848c.005 3.203-.006 3.583-.061 4.848c-.051 1.17-.245 1.805-.408 2.23c-.216.56-.477.96-.896 1.38a3.705 3.705 0 0 1-1.378.9c-.422.165-1.058.362-2.226.418c-1.266.06-1.645.072-4.85.079c-3.204.007-3.582-.006-4.848-.06m9.783-16.192a1.44 1.44 0 1 0 1.437-1.442a1.44 1.44 0 0 0-1.437 1.442M5.839 12.012a6.161 6.161 0 1 0 12.323-.024a6.162 6.162 0 0 0-12.323.024M8 12.008A4 4 0 1 1 12.008 16A4 4 0 0 1 8 12.008"
                    />
                </svg>
            </a>
        </div>
        <div class="footer-links">
            <div class="rights">
                <p>© {{ new Date().getFullYear() }} BuyBusinessClass. All rights reserved.</p>
            </div>
            <div class="rules">
                <router-link to="/privacy" title="Privacy Policy">Privacy Policy</router-link>
                <router-link to="/terms" title="Terms of Use">Terms of Use</router-link>
                <a href="/sitemap" target="_blank" title="Sitemap">Sitemap</a>
            </div>
        </div>
    </div>
</template>

<script>
// Components
import AirlinesLogos from '@/common/UI/AirlinesLogos.vue'
import SvgContainer from '@/components/Header/SvgContainer.vue'

export default {
    components: {
        SvgContainer,
        AirlinesLogos,
    },
    data() {
        return {
            facebookPageUrl: process.env.VUE_APP_FACEBOOK_PAGE_URL,
            twitterPageUrl: process.env.VUE_APP_TWITTER_PAGE_URL,
            linkedinPageUrl: process.env.VUE_APP_LINKEDIN_PAGE_URL,
            instagramPageUrl: process.env.VUE_APP_INSTAGRAM_PAGE_URL,
        }
    },
}
</script>

<style lang="scss" src="@/styles/footer.scss"></style>
<style scoped lang="scss">
.secure-3d {
    margin-inline: 10px;
}

.socials {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: white;
    padding-bottom: 2rem;
    font-size: 1.5rem;

    a {
        opacity: 0.24;

        &:hover {
            opacity: 1;
        }
    }
}
</style>
