import { useState } from 'react'
import { Link } from 'react-router-dom'

export const faqs = [
    {
        question: 'FAQ 1: How can I find discounted business class flights for last-minute travel?',
        answer: 'Finding discounted business class flights for last-minute travel can be challenging, but there are a few ways to increase your chances. Airlines often offer last-minute promotions, so checking the airline\u2019s website directly and signing up for fare alerts can help. Travel platforms like BuyBusinessClass offer exclusive last-minute business class deals with flexible booking options. Additionally, staying flexible with travel dates can lead to cheaper fares closer to your departure.',
        schemaQuestion: 'How can I find discounted business class flights for last-minute travel?',
    },
    {
        question: 'FAQ 2: What is the best way to book cheap international business class flights?',
        answer: 'To book cheap international business class flights, it\u2019s essential to compare prices across various travel platforms. Off-peak season travel dates generally offer the lowest business class fares. Using loyalty points or miles can also significantly reduce the cost. Signing up for airline newsletters or using platforms like BuyBusinessClass will keep you updated on discounted business class tickets and deals.',
        schemaQuestion: 'What is the best way to book cheap international business class flights?',
    },
    {
        question: 'FAQ 3: How much does a business class flight ticket usually cost?',
        answer: 'Business class flight tickets can vary greatly depending on the airline, destination, and time of booking. Typically, international business class tickets range from $1,100 to $5,000. Booking in advance or during an airline sale can secure the best price. Platforms like BuyBusinessClass can help compare and secure cheap business class tickets',
        schemaQuestion: 'How much does a business class flight ticket usually cost?',
        schemaAnswer:
            'Business class flight tickets can vary greatly depending on the airline, destination, and time of booking. Typically, international business class tickets range from $1,100 to $5,000. Booking in advance or during an airline sale can secure the best price. Platforms like BuyBusinessClass can help compare and secure cheap business class tickets.',
    },
    {
        question: 'FAQ 4: Can I find business class flights at a discount during peak travel seasons?',
        answer: 'Yes, even during peak travel seasons, discounted business class flights are possible. The key is booking as early as possible and monitoring airline promotions or last-minute business class deals. Flexibility with travel dates can also help in securing discount business class fares.',
        schemaQuestion: 'Can I find business class flights at a discount during peak travel seasons?',
    },
    {
        question: 'FAQ 5: What is included in a business class ticket for international flights?',
        answer: 'A business class ticket for international flights typically includes premium amenities such as access to airport lounges, priority boarding, extra baggage allowance, gourmet meals, and fully reclining seats. Some airlines also offer in-flight entertainment and complimentary Wi-Fi, making the experience more comfortable compared to economy class.',
        schemaQuestion: 'What is included in a business class ticket for international flights?',
    },
    {
        question: 'FAQ 6: How can I get the best business class deals for international travel?',
        answer: 'To get the best business class deals for international travel, monitor price comparison websites and set fare alerts for your preferred destinations. Booking during airline sales or using frequent flyer miles can help secure cheap business class tickets. Flexible travel dates can also give you access to exclusive business class deals',
        schemaQuestion: 'How can I get the best business class deals for international travel?',
        schemaAnswer:
            'To get the best business class deals for international travel, monitor price comparison websites and set fare alerts for your preferred destinations. Booking during airline sales or using frequent flyer miles can help secure cheap business class tickets. Flexible travel dates can also give you access to exclusive business class deals.',
    },
    {
        question: 'FAQ 7: What is the baggage allowance for business class flights?',
        answer: 'Business class flights typically allow for a more generous baggage allowance than economy class. Passengers are usually permitted two checked bags and one carry-on. Some airlines may also offer priority baggage handling. Check with your airline for specific baggage allowances',
        schemaQuestion: 'What is the baggage allowance for business class flights?',
        schemaAnswer:
            'Business class flights typically allow for a more generous baggage allowance than economy class. Passengers are usually permitted two checked bags and one carry-on. Some airlines may also offer priority baggage handling. Check with your airline for specific baggage allowances.',
    },
    {
        question: 'FAQ 8: How do I find cheap business class flights with flexible travel dates?',
        answer: 'Finding cheap business class flights is easier with flexible travel dates. Platforms like BuyBusinessClass allow you to compare fares across a range of dates, helping you find the best deals. Booking during off-peak seasons or monitoring for last-minute offers can also lead to discounted business class tickets.',
        schemaQuestion: 'How do I find cheap business class flights with flexible travel dates?',
    },
    {
        question: 'FAQ 9: What are the benefits of booking business class flights in advance?',
        answer: 'Booking business class flights in advance usually results in cheaper fares, especially during sales or promotions. Airlines tend to offer their best prices for business class tickets when booking months ahead, allowing for better seat selection and a more relaxed travel experience.',
        schemaQuestion: 'What are the benefits of booking business class flights in advance?',
    },
    {
        question: 'FAQ 10: How much baggage is included in a business class ticket?',
        answer: 'Most business class tickets come with a generous baggage allowance, including at least two checked bags and one carry-on. Some airlines may offer additional perks such as priority baggage handling. Always check the specific business class ticket conditions with the airline.',
        schemaQuestion: 'How much baggage is included in a business class ticket?',
    },
    {
        question: 'FAQ 11: Are business class tickets refundable or changeable?',
        answer: 'Business class tickets are generally more flexible than economy class tickets, with many offering options for refunds or changes without fees. However, it\u2019s important to check the fare conditions with your airline to confirm whether changes or refunds are permitted.',
        schemaQuestion: 'Are business class tickets refundable or changeable?',
    },
    {
        question: 'FAQ 12: How can I book business class flights using frequent flyer miles?',
        answer: 'You can book business class flights using frequent flyer miles by visiting the rewards section of the airlines website or contacting customer service. Airlines often allow miles to be used for upgrades to business class, particularly for international flights.',
        schemaQuestion: 'How can I book business class flights using frequent flyer miles?',
        schemaAnswer:
            "You can book business class flights using frequent flyer miles by visiting the rewards section of the airline's website or contacting customer service. Airlines often allow miles to be used for upgrades to business class, particularly for international flights.",
    },
    {
        question: 'FAQ 13: How do I access business class lounges with a discounted ticket?',
        answer: 'Access to business class lounges is usually included with any business class ticket, including discounted tickets. Some airlines also offer lounge access through frequent flyer programs or premium credit cards.',
        schemaQuestion: 'How do I access business class lounges with a discounted ticket?',
    },
    {
        question: 'FAQ 14: What are the best times to find cheap business class fares?',
        answer: 'The best times to find cheap business class fares are typically during off-peak travel seasons, such as late winter or early spring. Booking several months in advance or during airline promotions can also help secure lower prices.',
        schemaQuestion: 'What are the best times to find cheap business class fares?',
    },
    {
        question: 'FAQ 15: Can I book business class tickets for less using points or miles?',
        answer: 'Yes, you can book business class tickets for less using frequent flyer points or miles. Booking early is essential as reward seats can fill up quickly, especially on international routes.',
        schemaQuestion: 'Can I book business class tickets for less using points or miles?',
    },
    {
        question: 'FAQ 16: How much does a business class flight to Europe typically cost?',
        answer: 'The cost of a business class flight to Europe can range between $1,500 and $4,000 depending on the airline, destination, and booking time. Booking in advance or using frequent flyer miles can reduce the cost.',
        schemaQuestion: 'How much does a business class flight to Europe typically cost?',
    },
    {
        question: 'FAQ 17: Can I upgrade to business class on discounted fares?',
        answer: 'Yes, many airlines allow upgrades to business class even on discounted fares. You can upgrade using frequent flyer miles or by paying a fee. However, not all discounted fares are eligible for upgrades, so check the fare conditions.',
        schemaQuestion: 'Can I upgrade to business class on discounted fares?',
    },
    {
        question: 'FAQ 18: Are business class flights to Asia cheaper during off-peak travel seasons?',
        answer: 'Yes, business class flights to Asia are often cheaper during off-peak seasons such as late winter or early spring. Booking during airline promotions can also help secure a better deal.',
        schemaQuestion: 'Are business class flights to Asia cheaper during off-peak travel seasons?',
    },
    {
        question: 'FAQ 19: What are the perks of flying business class to the USA from Europe?',
        answer: 'Flying business class from Europe to the USA comes with several perks, including fully reclining seats, priority boarding, access to business class lounges, and gourmet in-flight meals. Enhanced privacy and premium entertainment options are also standard on long-haul flights.',
        schemaQuestion: 'What are the perks of flying business class to the USA from Europe?',
    },
    {
        question: 'FAQ 20: How do I compare business class fares to get the best deals?',
        answer: 'To compare business class fares and get the best deals, use flight aggregator websites that specialize in premium tickets. You can also set up fare alerts for your desired destinations. Platforms like BuyBusinessClass offer exclusive deals and discounts on business class tickets. Being flexible with your travel dates and considering off-peak seasons can help secure better fares.',
        schemaQuestion: 'How do I compare business class fares to get the best deals?',
    },
]

export function getFaqSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({
            '@type': 'Question',
            name: item.schemaQuestion,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.schemaAnswer || item.answer,
            },
        })),
    }
}

export default function FaqSection({ limit = 6, showMoreLink = true }) {
    const [openIndex, setOpenIndex] = useState(null)
    const visibleFaqs = limit ? faqs.slice(0, limit) : faqs

    return (
        <div className="faq">
            <h2>FAQ Section</h2>
            {visibleFaqs.map((item, index) => (
                <div key={index} className="faq-item">
                    <button className="faq-question" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                        {item.question}
                        <span>{openIndex === index ? '-' : '+'}</span>
                    </button>
                    {openIndex === index && (
                        <div className="faq-answer">
                            <p>{item.answer}</p>
                        </div>
                    )}
                </div>
            ))}
            {showMoreLink && (
                <div className="text-center mt-4">
                    <Link to="/faq" className="explore-more-btn">
                        Find More Questions
                    </Link>
                </div>
            )}
        </div>
    )
}
