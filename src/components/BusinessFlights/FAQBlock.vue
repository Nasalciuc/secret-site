<template>
    <div class="faq">
        <h2>FAQ Section</h2>
        <div v-for="(item, index) in faqs" :key="index" class="faq-item">
            <button class="faq-question" @click="toggleCollapse(index)">
                {{ item.question }}
                <span>{{ openIndex === index ? '-' : '+' }}</span>
            </button>
            <div v-if="openIndex === index" class="faq-answer">
                <p>{{ item.answer }}</p>
            </div>
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
                {
                    question: 'FAQ 7: What is the baggage allowance for business class flights?',
                    answer: 'Business class flights typically allow for a more generous baggage allowance than economy class. Passengers are usually permitted two checked bags and one carry-on. Some airlines may also offer priority baggage handling. Check with your airline for specific baggage allowances',
                },
                {
                    question: 'FAQ 8: How do I find cheap business class flights with flexible travel dates?',
                    answer: 'Finding cheap business class flights is easier with flexible travel dates. Platforms like BuyBusinessClass allow you to compare fares across a range of dates, helping you find the best deals. Booking during off-peak seasons or monitoring for last-minute offers can also lead to discounted business class tickets.',
                },
                {
                    question: 'FAQ 9: What are the benefits of booking business class flights in advance?',
                    answer: 'Booking business class flights in advance usually results in cheaper fares, especially during sales or promotions. Airlines tend to offer their best prices for business class tickets when booking months ahead, allowing for better seat selection and a more relaxed travel experience.',
                },
                {
                    question: 'FAQ 10: How much baggage is included in a business class ticket?',
                    answer: 'Most business class tickets come with a generous baggage allowance, including at least two checked bags and one carry-on. Some airlines may offer additional perks such as priority baggage handling. Always check the specific business class ticket conditions with the airline.',
                },
                {
                    question: 'FAQ 11: Are business class tickets refundable or changeable?',
                    answer: 'Business class tickets are generally more flexible than economy class tickets, with many offering options for refunds or changes without fees. However, it’s important to check the fare conditions with your airline to confirm whether changes or refunds are permitted.',
                },
                {
                    question: 'FAQ 12: How can I book business class flights using frequent flyer miles?',
                    answer: 'You can book business class flights using frequent flyer miles by visiting the rewards section of the airlines website or contacting customer service. Airlines often allow miles to be used for upgrades to business class, particularly for international flights.',
                },
                {
                    question: 'FAQ 13: How do I access business class lounges with a discounted ticket?',
                    answer: 'Access to business class lounges is usually included with any business class ticket, including discounted tickets. Some airlines also offer lounge access through frequent flyer programs or premium credit cards.',
                },
                {
                    question: 'FAQ 14: What are the best times to find cheap business class fares?',
                    answer: 'The best times to find cheap business class fares are typically during off-peak travel seasons, such as late winter or early spring. Booking several months in advance or during airline promotions can also help secure lower prices.',
                },
                {
                    question: 'FAQ 15: Can I book business class tickets for less using points or miles?',
                    answer: 'Yes, you can book business class tickets for less using frequent flyer points or miles. Booking early is essential as reward seats can fill up quickly, especially on international routes.',
                },
                {
                    question: 'FAQ 16: How much does a business class flight to Europe typically cost?',
                    answer: 'The cost of a business class flight to Europe can range between $1,500 and $4,000 depending on the airline, destination, and booking time. Booking in advance or using frequent flyer miles can reduce the cost.',
                },
                {
                    question: 'FAQ 17: Can I upgrade to business class on discounted fares?',
                    answer: 'Yes, many airlines allow upgrades to business class even on discounted fares. You can upgrade using frequent flyer miles or by paying a fee. However, not all discounted fares are eligible for upgrades, so check the fare conditions.',
                },
                {
                    question: 'FAQ 18: Are business class flights to Asia cheaper during off-peak travel seasons?',
                    answer: 'Yes, business class flights to Asia are often cheaper during off-peak seasons such as late winter or early spring. Booking during airline promotions can also help secure a better deal.',
                },
                {
                    question: 'FAQ 19: What are the perks of flying business class to the USA from Europe?',
                    answer: 'Flying business class from Europe to the USA comes with several perks, including fully reclining seats, priority boarding, access to business class lounges, and gourmet in-flight meals. Enhanced privacy and premium entertainment options are also standard on long-haul flights.',
                },
                {
                    question: 'FAQ 20: How do I compare business class fares to get the best deals?',
                    answer: 'To compare business class fares and get the best deals, use flight aggregator websites that specialize in premium tickets. You can also set up fare alerts for your desired destinations. Platforms like BuyBusinessClass offer exclusive deals and discounts on business class tickets. Being flexible with your travel dates and considering off-peak seasons can help secure better fares.',
                },
            ],
        }
    },
    methods: {
        toggleCollapse(index) {
            if (this.openIndex === index) {
                this.openIndex = null
            } else {
                this.openIndex = index
            }
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
