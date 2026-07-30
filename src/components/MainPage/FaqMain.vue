<template>
    <div class="faq">
        <h2>FAQ Section</h2>

        <div v-for="(item, index) in visibleFaqs" :key="index" class="faq-item">
            <button class="faq-question" @click="toggleCollapse(index)">
                {{ item.question }}
                <span>{{ openIndex === index ? '-' : '+' }}</span>
            </button>
            <div v-if="openIndex === index" class="faq-answer">
                <p>{{ item.answer }}</p>
            </div>
        </div>

        <div class="text-center mt-4">
            <button class="explore-more-btn" @click="redirectToMore">Find More Questions</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            openIndex: null,

            faqs: [
                {
                    question: 'FAQ 1: How can I find discounted business class flights for last-minute travel?',
                    answer: 'Finding discounted business class flights for last-minute travel can be challenging, but there are a few ways to increase your chances. Airlines often offer last-minute promotions, so checking the airline’s website directly and signing up for fare alerts can help. Travel platforms like BuyBusinessClass offer exclusive last-minute business class deals with flexible booking options. Additionally, staying flexible with travel dates can lead to cheaper fares closer to your departure.',
                },
                {
                    question: 'FAQ 2: What is the best way to book cheap international business class flights?',
                    answer: 'To book cheap international business class flights, it’s essential to compare prices across various travel platforms. Off-peak season travel dates generally offer the lowest business class fares. Using loyalty points or miles can also significantly reduce the cost. Signing up for airline newsletters or using platforms like BuyBusinessClass will keep you updated on discounted business class tickets and deals.',
                },
                {
                    question: 'FAQ 3: How much does a business class flight ticket usually cost?',
                    answer: 'Business class flight tickets can vary greatly depending on the airline, destination, and time of booking. Typically, international business class tickets range from $1,100 to $5,000. Booking in advance or during an airline sale can secure the best price. Platforms like BuyBusinessClass can help compare and secure cheap business class tickets',
                },
                {
                    question: 'FAQ 4: Can I find business class flights at a discount during peak travel seasons?',
                    answer: 'Yes, even during peak travel seasons, discounted business class flights are possible. The key is booking as early as possible and monitoring airline promotions or last-minute business class deals. Flexibility with travel dates can also help in securing discount business class fares.',
                },
                {
                    question: 'FAQ 5: What is included in a business class ticket for international flights?',
                    answer: 'A business class ticket for international flights typically includes premium amenities such as access to airport lounges, priority boarding, extra baggage allowance, gourmet meals, and fully reclining seats. Some airlines also offer in-flight entertainment and complimentary Wi-Fi, making the experience more comfortable compared to economy class.',
                },
                {
                    question: 'FAQ 6: How can I get the best business class deals for international travel?',
                    answer: 'To get the best business class deals for international travel, monitor price comparison websites and set fare alerts for your preferred destinations. Booking during airline sales or using frequent flyer miles can help secure cheap business class tickets. Flexible travel dates can also give you access to exclusive business class deals',
                },
            ],
        }
    },
    computed: {
        visibleFaqs() {
            return this.faqs.slice(0, 6)
        },
    },
    methods: {
        toggleCollapse(index) {
            this.openIndex = this.openIndex === index ? null : index
        },
        redirectToMore() {
            this.$router.push('/faq') // dacă folosești Vue Router
            // sau:
            // window.location.href = '/all-deals'; // dacă vrei redirect clasic
        },
    },
}
</script>

<style scoped>
.faq {
    width: 100%;
    max-width: 800px;
    margin: 50px auto;
    padding-top: 3%;
    text-align: center;
}

h2 {
    font-size: 38px;
    text-align: center;
    margin-bottom: 50px;
    color: #dadde0;
    font-family: 'SSP-bold';
}

.faq-item {
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: all 0.3s ease-in-out;
}

.faq-question {
    background-color: white;
    color: #b4853b;
    font-family: 'inter';
    font-weight: 600;
    font-size: 1em;
    padding: 8px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.faq-question:hover {
    background-color: #b4853b;
    color: white;
}

.faq-answer {
    padding: 15px;
    background-color: #f9f9f9;
    color: #686c70;
    line-height: 24px;
    font-size: 15px;
    font-family: 'Inter', sans-serif;
    border-top: 1px solid #ddd;
    animation: fadeIn 0.4s ease;
}

.faq-answer p {
    margin: 0;
}
.explore-more-btn {
    background-color: #b4853b;
    color: white;
    font-family: 'Inter', sans-serif;
    margin-top: 12px;
    font-weight: 600;
    font-size: 16px;
    padding: 12px 24px;
    border: none;
    border-radius: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition:
        background-color 0.3s ease,
        transform 0.2s ease;
}

.explore-more-btn:hover {
    background-color: #8f6a2f;
    transform: translateY(-2px);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

span {
    font-size: 1.5em;
    transition: transform 0.3s ease;
}

.faq-question span {
    transform: rotate(0deg);
}

.faq-question:hover span {
    transform: rotate(90deg);
}

.faq-item .faq-answer {
    border-radius: 0 0 8px 8px;
}
</style>
