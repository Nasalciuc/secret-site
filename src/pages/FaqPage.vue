<template>
    <div style="padding-top: 30px" class="faq-page">
        <FAQBlock />
    </div>
</template>

<script>
import FAQBlock from '@/components/BusinessFlights/FAQBlock.vue'

export default {
    components: {
        FAQBlock,
    },

    data() {
        return {
            faqSchema: {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'How can I find discounted business class flights for last-minute travel?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Finding discounted business class flights for last-minute travel can be challenging, but there are a few ways to increase your chances. Airlines often offer last-minute promotions, so checking the airline’s website directly and signing up for fare alerts can help. Travel platforms like BuyBusinessClass offer exclusive last-minute business class deals with flexible booking options. Additionally, staying flexible with travel dates can lead to cheaper fares closer to your departure.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the best way to book cheap international business class flights?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'To book cheap international business class flights, it’s essential to compare prices across various travel platforms. Off-peak season travel dates generally offer the lowest business class fares. Using loyalty points or miles can also significantly reduce the cost. Signing up for airline newsletters or using platforms like BuyBusinessClass will keep you updated on discounted business class tickets and deals.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How much does a business class flight ticket usually cost?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Business class flight tickets can vary greatly depending on the airline, destination, and time of booking. Typically, international business class tickets range from $1,100 to $5,000. Booking in advance or during an airline sale can secure the best price. Platforms like BuyBusinessClass can help compare and secure cheap business class tickets.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Can I find business class flights at a discount during peak travel seasons?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Yes, even during peak travel seasons, discounted business class flights are possible. The key is booking as early as possible and monitoring airline promotions or last-minute business class deals. Flexibility with travel dates can also help in securing discount business class fares.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What is included in a business class ticket for international flights?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'A business class ticket for international flights typically includes premium amenities such as access to airport lounges, priority boarding, extra baggage allowance, gourmet meals, and fully reclining seats. Some airlines also offer in-flight entertainment and complimentary Wi-Fi, making the experience more comfortable compared to economy class.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How can I get the best business class deals for international travel?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'To get the best business class deals for international travel, monitor price comparison websites and set fare alerts for your preferred destinations. Booking during airline sales or using frequent flyer miles can help secure cheap business class tickets. Flexible travel dates can also give you access to exclusive business class deals.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the baggage allowance for business class flights?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Business class flights typically allow for a more generous baggage allowance than economy class. Passengers are usually permitted two checked bags and one carry-on. Some airlines may also offer priority baggage handling. Check with your airline for specific baggage allowances.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I find cheap business class flights with flexible travel dates?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Finding cheap business class flights is easier with flexible travel dates. Platforms like BuyBusinessClass allow you to compare fares across a range of dates, helping you find the best deals. Booking during off-peak seasons or monitoring for last-minute offers can also lead to discounted business class tickets.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What are the benefits of booking business class flights in advance?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Booking business class flights in advance usually results in cheaper fares, especially during sales or promotions. Airlines tend to offer their best prices for business class tickets when booking months ahead, allowing for better seat selection and a more relaxed travel experience.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How much baggage is included in a business class ticket?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Most business class tickets come with a generous baggage allowance, including at least two checked bags and one carry-on. Some airlines may offer additional perks such as priority baggage handling. Always check the specific business class ticket conditions with the airline.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Are business class tickets refundable or changeable?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Business class tickets are generally more flexible than economy class tickets, with many offering options for refunds or changes without fees. However, it’s important to check the fare conditions with your airline to confirm whether changes or refunds are permitted.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How can I book business class flights using frequent flyer miles?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: "You can book business class flights using frequent flyer miles by visiting the rewards section of the airline's website or contacting customer service. Airlines often allow miles to be used for upgrades to business class, particularly for international flights.",
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I access business class lounges with a discounted ticket?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Access to business class lounges is usually included with any business class ticket, including discounted tickets. Some airlines also offer lounge access through frequent flyer programs or premium credit cards.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What are the best times to find cheap business class fares?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'The best times to find cheap business class fares are typically during off-peak travel seasons, such as late winter or early spring. Booking several months in advance or during airline promotions can also help secure lower prices.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Can I book business class tickets for less using points or miles?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Yes, you can book business class tickets for less using frequent flyer points or miles. Booking early is essential as reward seats can fill up quickly, especially on international routes.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How much does a business class flight to Europe typically cost?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'The cost of a business class flight to Europe can range between $1,500 and $4,000 depending on the airline, destination, and booking time. Booking in advance or using frequent flyer miles can reduce the cost.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Can I upgrade to business class on discounted fares?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Yes, many airlines allow upgrades to business class even on discounted fares. You can upgrade using frequent flyer miles or by paying a fee. However, not all discounted fares are eligible for upgrades, so check the fare conditions.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Are business class flights to Asia cheaper during off-peak travel seasons?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Yes, business class flights to Asia are often cheaper during off-peak seasons such as late winter or early spring. Booking during airline promotions can also help secure a better deal.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What are the perks of flying business class to the USA from Europe?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Flying business class from Europe to the USA comes with several perks, including fully reclining seats, priority boarding, access to business class lounges, and gourmet in-flight meals. Enhanced privacy and premium entertainment options are also standard on long-haul flights.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I compare business class fares to get the best deals?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'To compare business class fares and get the best deals, use flight aggregator websites that specialize in premium tickets. You can also set up fare alerts for your desired destinations. Platforms like BuyBusinessClass offer exclusive deals and discounts on business class tickets. Being flexible with your travel dates and considering off-peak seasons can help secure better fares.',
                        },
                    },
                ],
            },
        }
    },

    mounted() {
        this.setCanonical()
        this.injectSchema()
    },

    beforeUnmount() {
        const existing = document.getElementById('faq-schema')
        if (existing) existing.remove()
    },

    methods: {
        setCanonical() {
            const url = 'https://buybusinessclass.com/faq'
            let link = document.querySelector('link[rel="canonical"]')

            if (!link) {
                link = document.createElement('link')
                link.rel = 'canonical'
                document.head.appendChild(link)
            }

            link.href = url
        },

        injectSchema() {
            const existing = document.getElementById('faq-schema')
            if (existing) existing.remove()

            const script = document.createElement('script')
            script.type = 'application/ld+json'
            script.id = 'faq-schema'
            script.text = JSON.stringify(this.faqSchema)

            document.head.appendChild(script)
        },
    },
}
</script>
<style>
.faq-page-title {
    font-size: 38px;
    text-align: center;
    margin: 0 auto 20px;
    color: #dadde0;
    font-family: 'SSP-bold';
}
</style>
