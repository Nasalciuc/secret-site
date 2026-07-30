<template>
    <div class="container-airline">
        <div class="content-wrapper">
            <div v-if="airline" class="airline-details">
                <first-block-airline
                    :airlineName="airline.name"
                    :details="airline.details"
                    :departure="departureList"
                />
            </div>
            <div v-else>
                <p>Loading...</p>
            </div>
            <second-block />
        </div>
    </div>
    <airline-description
        :details="airline.details"
        :title="airline.title"
        :subtitle="airline.subtitle"
        :second="airline.second"
        :paragraph="airline.paragraph"
        :facts_title="airline.facts_title"
        :facts="airline.facts"
    />
</template>

<script>
import FirstBlockAirline from '../components/HeaderForm/FlightCard/FirstBlockAirline.vue'
import SecondBlock from '../components/HeaderForm/FlightCard/SecondBlock.vue'
import AirlineDescription from '../components/Airlines/AirlineDescription.vue'

export default {
    components: {
        FirstBlockAirline,
        SecondBlock,
        AirlineDescription,
    },
    props: ['slug'],
    mounted() {
        const { slug } = this.$route.params
        const canonicalUrl = `https://buybusinessclass.com/airlines/${slug}`

        const canonicalLink = document.createElement('link')
        canonicalLink.rel = 'canonical'
        canonicalLink.href = canonicalUrl
        document.head.appendChild(canonicalLink)
    },
    data() {
        return {
            airlines: [
                {
                    slug: 'emirates',
                    name: 'Emirates Airlines',
                    details:
                        'Emirates offers a Business Class experience that represents the pinnacle of luxury and sophistication in air travel. Renowned for its exceptional service and opulent amenities, Emirates ensures that every journey is an extraordinary experience. Whether you are traveling for business or pleasure, Emirates Business Class transforms the flight into a seamless blend of comfort and elegance.',
                    title: 'Emirates Business Class:',
                    subtitle: 'Elevating Luxury to New Heights',
                    second: 'The Emirates - Business Class',
                    paragraph:
                        'In Emirates Business Class, passengers are welcomed into a cabin that exudes modern luxury and comfort. The Business Class seats are designed to offer the ultimate in relaxation, with many featuring fully lie-flat beds that transform into a comfortable sleeping surface for long-haul flights. Each seat includes direct aisle access, ensuring privacy and convenience throughout the journey. <br/> <br/> The cabin design is characterized by its sophisticated and contemporary style, with a focus on creating a serene and elegant atmosphere. Premium materials, ambient lighting, and meticulous attention to detail enhance the overall comfort and enjoyment of the flight.',
                    facts_title: 'Interesting Facts About Emirates',
                    facts: '<b>Award-Winning Service:</b> Emirates has received numerous awards for its Business Class product, including accolades for its service and innovation. <br/> <br/> <b>Dubai Hub:</b> Dubai International Airport serves as the main hub for Emirates, offering a key gateway to the Middle East and beyond.<br/><br/> <b>ICE Entertainment:</b> The airline’s ICE in-flight entertainment system is renowned for its extensive selection of movies, TV shows, and music <br/><br/> <b>Global Reach:</b> Emirates operates flights to more than 150 destinations across six continents, making it a leading global airline',
                },
                {
                    slug: 'turkish',
                    name: 'Turkish Airlines',
                    details:
                        'Welcome to Turkish Airlines Business Class, where luxury, hospitality, and innovation meet to create an unparalleled travel experience. As one of the most recognized airlines in the world, Turkish Airlines has built a reputation for offering world-class service, extensive route options, and unique Turkish hospitality, which elevates the travel experience for every passenger. Whether you are a business traveler or someone looking for an elevated travel experience, Turkish Airlines Business Class promises to make your journey as memorable as the destination.',
                    title: 'Turkish Airlines Business Class:',
                    subtitle: 'A Journey Beyond the Skies',
                    second: 'Turkish Airlines - Business Class',
                    paragraph:
                        'Upon stepping into the Turkish Airlines Business Class cabin, you are greeted with an ambiance of sophistication and elegance. The seats, designed to offer maximum comfort, convert into fully flat beds so that you can enjoy restful sleep throughout your journey. With direct aisle access and ample personal space, passengers enjoy privacy and convenience throughout the flight. <br/> <br/>The gourmet dining experience on Turkish Airlines is a signature aspect of the Business Class service. Turkish Airlines takes pride in offering a wide selection of exquisite dishes, including authentic Turkish cuisine prepared by world-class chefs. Passengers are treated to a multi-course meal, featuring seasonal ingredients and an array of drinks, including premium Turkish coffee and tea.<br/><br/> In-flight entertainment is designed to suit every taste. With a high-definition personal screen, you can access the latest movies, TV shows, and music. Turkish Airlines ensures that long-haul flights are anything but boring, with an extensive entertainment library curated for all interests and cultures.',
                    facts_title: 'Interesting Facts About Turkish Airlines',
                    facts: '<b>Longest Flight:</b> Turkish Airlines operates one of the longest non-stop commercial flights from Istanbul to Los Angeles, covering over 7,000 miles. <br/><br/> <b>SkyChef:</b> Turkish Airlines is one of the few airlines to feature onboard chefs who prepare fresh meals for Business Class passengers <br/><br/> <b>Award-Winning:</b> Turkish Airlines has been consistently recognized as Europe’s Best Airline by Skytrax and has won multiple awards for its Business Class service.<br/><br/> <b>Historic Milestone:</b> Turkish Airlines was established in 1933 with just five aircraft; today, it operates one of the youngest and most advanced fleets in the world.',
                },
                {
                    slug: 'singapore',
                    name: 'Singapore Airlines',
                    details:
                        'Singapore Airlines Business Class sets a high standard for luxury air travel, offering a combination of innovation, comfort, and impeccable service. Recognized globally for its exceptional quality, Singapore Airlines has become a benchmark for other carriers aiming to deliver a premium experience. From the cutting-edge Business Class cabins to the renowned in-flight dining, every aspect of the journey is designed to make passengers feel pampered and well-cared-for.',
                    title: 'Singapore Airlines Business Class:',
                    subtitle: 'Luxury Redefined in the Skies',
                    second: 'Singapore Airlines - Business Class',
                    paragraph:
                        'Flying in Singapore Airlines Business Class is more than just a flight; it’s an immersion into a world of luxury. The airline’s Business Class seats, especially on its Airbus A350 and Boeing 777 aircraft, are some of the most spacious in the industry. These seats transform into fully lie-flat beds, offering a comfortable, restful experience for long-haul journeys. With ample room, direct aisle access, and privacy screens, each passenger has their own personal space, ensuring both comfort and discretion. <br/> <br/> The cabin itself is designed with sophistication in mind, featuring elegant materials, soft lighting, and plenty of storage space for personal belongings. From the moment you board, it’s clear that every detail has been meticulously crafted to elevate your flying experience.<br/><br/> In Singapore Airlines Business Class, dining is a key highlight. The airline offers a world-class culinary experience, featuring gourmet meals crafted by top chefs from around the globe. Singapore Airlines is famous for its Book the Cook service, which allows Business Class passengers to pre-order a selection of premium meals before their flight. This personalized approach ensures that your dining preferences are catered to, no matter your taste.',
                    facts_title: 'Interesting Facts About Singapore Airlines',
                    facts: '<b>Singapore Airlines Suites:</b> On select flights, Singapore Airlines offers Suites Class, which features private cabins that redefine luxury air travel. <br/><br/> <b>Longest Flight: Singapore Airlines:</b> operates the world’s longest commercial flight, flying non-stop from Singapore to New York.<br/><br/> <b>KrisFlyer Program:</b> The KrisFlyer loyalty program is one of the most generous in the industry, offering members numerous ways to earn and redeem miles for premium cabin upgrades.<br/><br/> <b>Innovation Leader:</b> Singapore Airlines was the first airline to introduce the Airbus A380, the largest passenger aircraft in the world, and continues to be a pioneer in aviation technology.',
                },
                {
                    slug: 'qatar',
                    name: 'Qatar Airways',
                    details:
                        'Qatar Airways offers a Business Class experience that exemplifies luxury and sophistication. As one of the world’s leading airlines, Qatar Airways is renowned for its commitment to excellence in service, comfort, and innovation. Whether you’re traveling for business or leisure, Qatar Airways Business Class ensures that every aspect of your journey is marked by unparalleled elegance and quality.',
                    title: 'Qatar Airways Business Class:',
                    subtitle: 'Indulge in a World-Class Experience',
                    second: 'Qatar Airways - Business Class',
                    paragraph:
                        'In Qatar Airways Business Class, passengers are welcomed into a cabin designed to provide exceptional comfort and style. The Business Class seats feature a cutting-edge design that transforms into a fully lie-flat bed, ensuring a restful experience on long-haul flights. Each seat offers direct aisle access, allowing for greater privacy and ease of movement.<br/><br/>The cabin’s interior reflects Qatar Airways’ dedication to luxury, with contemporary design elements, ambient lighting, and high-quality materials that create a serene and inviting atmosphere. Every detail is meticulously crafted to enhance your comfort and enjoyment throughout the flight.<br/><br/>Dining in Qatar Airways Business Class is a culinary delight that celebrates global flavors and fine dining. The menu features a selection of gourmet dishes prepared with fresh, high-quality ingredients, offering a taste of international cuisine alongside regional specialties.',
                    facts_title: 'Interesting Facts About Qatar Airways',
                    facts: '<b>Award-Winning Service:</b> Qatar Airways has been consistently recognized for its exceptional service and luxury in global awards. <br/><br/> <b>Oneworld Alliance Member:</b> Qatar Airways is a member of the Oneworld alliance, offering extensive global connectivity<br/><br/> <b>Innovative Aircraft:</b> The airline is known for its modern fleet, including the Qatar Airways A350 and B787 Dreamliner.<br/><br/> <b>Sustainability Efforts:</b> Qatar Airways is actively working on reducing its carbon footprint and investing in sustainable aviation practices.',
                },
                {
                    slug: 'etihad',
                    name: 'Etihad Airways',
                    details:
                        'Step into a world of sophistication with Etihad Airways Business Class, where luxury, cutting-edge design, and unparalleled service combine to create a truly unique flying experience. Etihad Airways, the national carrier of the United Arab Emirates, has carved out a name for itself as one of the top global airlines, renowned for its dedication to providing an exceptional travel experience. Whether you’re a seasoned business traveler or flying for pleasure, Etihad Airways Business Class offers an unparalleled journey, designed to make every mile enjoyable and comfortable',
                    title: 'Etihad Airways Business Class:',
                    subtitle: 'A Fusion of Luxury and Innovation',
                    second: 'The Etihad Airways - Business Class',
                    paragraph:
                        'From the moment you step aboard, Etihad Airways Business Class envelops you in comfort and style. The cabins are designed with privacy and personal space in mind, featuring luxurious seats that convert into fully flat beds with direct aisle access. Each seat is equipped with adjustable headrests, lumbar support, and soft bedding, ensuring you arrive at your destination fully rested. <br/> <br/> Dining in Etihad Business Class is an experience in itself. The airline’s inflight dining options are curated by top chefs and offer a blend of global cuisine and Middle Eastern flavors. Passengers can choose from an à la carte menu, featuring fresh ingredients and paired with an extensive wine and beverage list. The "Dine Anytime" concept allows passengers to enjoy their meals at their convenience, offering flexibility not often seen in air travel. <br/> <br/> In-flight entertainment is a key feature in Etihad Airways Business Class. Each seat is equipped with a large personal screen, offering a vast selection of movies, TV shows, music, and games. Whether you’re in the mood for the latest blockbuster or classic cinema, Etihad has something to suit all tastes. Additionally, the E-Box system allows you to connect your devices and watch your own content or work, making your journey both entertaining and productive.',
                    facts_title: 'Interesting Facts About Etihad Airways',
                    facts: '<b>Flying Nanny:</b> Etihad Airways offers a dedicated "Flying Nanny" service on long-haul flights to assist parents traveling with children. <br/><br/> <b>Business Studio:</b> On newer aircraft, Etihad’s Business Class cabins feature the innovative Business Studio, which offers 20% more space than traditional Business Class seats. <br/><br/> <b>Award-Winning Airline:</b> Etihad Airways has won numerous awards for its Business Class service, including recognition for its seat comfort, in-flight entertainment, and onboard dining. <br/><br/> <b>Exclusive Partnership:</b> Etihad Airways has a unique partnership with several luxury brands, ensuring that Business Class passengers receive high-end amenities, from skincare products to gourmet meals prepared by top chefs.',
                },
                {
                    slug: 'klm',
                    name: 'KLM',
                    details:
                        'Welcome to KLM Business Class, where Dutch design meets cutting-edge comfort to create a luxurious flying experience. As the national carrier of the Netherlands and one of the oldest airlines in the world, KLM Royal Dutch Airlines prides itself on delivering a unique blend of personal service, modern technology, and timeless elegance. Whether you’re traveling for business or leisure, KLM Business Class ensures a smooth, enjoyable journey from start to finish.',
                    title: 'KLM Business Class:',
                    subtitle: 'Elegance and Comfort in the Skies',
                    second: 'The KLM - Business Class',
                    paragraph:
                        'Stepping into the KLM Business Class cabin feels like entering a serene and stylish oasis. The seating is designed with comfort and privacy in mind. Each seat easily converts into a fully flat bed, allowing passengers to sleep comfortably on long-haul flights. With direct aisle access and personal storage spaces, passengers have ample room to stretch out, relax, or work.<br/><br/> Dining is an important part of the KLM Business Class experience. KLM offers a gourmet meal service curated by world-renowned Dutch chefs. Each meal is carefully prepared using fresh, seasonal ingredients and served on elegant tableware designed by Marcel Wanders. A wide selection of wines and beverages is also available to complement each meal, offering passengers a fine dining experience at 30,000 feet.<br/><br/>KLM also provides a first-rate in-flight entertainment system with personal screens, offering a vast selection of movies, TV shows, music, and games. Passengers can explore a library of international content in multiple languages, ensuring entertainment for all tastes. The Wi-Fi service ensures you stay connected to the world even while in the air, allowing for both leisure and productivity.',
                    facts_title: 'Interesting Facts About KLM',
                    facts: '<b>Oldest Airline:</b> KLM is the oldest airline in the world still operating under its original name, founded in 1919.<br/><br/> <b>Delft Blue Tradition:</b> Since the 1950s, KLM has given out miniature Delft Blue houses filled with Dutch gin to Business Class passengers on intercontinental flights.<br/><br/> <b>Green Ambitions:</b> KLM was the first airline in the world to operate a flight powered partly by biofuel, underscoring its commitment to sustainability.<br/><br/> <b>SkyTeam Founding Member:</b> KLM was one of the founding members of the SkyTeam alliance, making it a key player in the global aviation network.',
                },
                {
                    slug: 'iberia',
                    name: 'Iberia',
                    details:
                        'Iberia Business Class invites passengers to explore the perfect fusion of comfort, sophistication, and Spanish hospitality. As Spain’s national carrier and a leading member of the oneworld alliance, Iberia offers a premium Business Class experience that blends modern amenities with a distinct Mediterranean flair. Whether you’re flying for business or leisure, Iberia Business Class ensures a pleasant and memorable journey.',
                    title: 'Iberia Business Class:',
                    subtitle: 'A Journey of Elegance and Spanish Charm',
                    second: 'The Iberia - Business Class',
                    paragraph:
                        'When you step into Iberia’s Business Class cabin, you are greeted with spacious, ergonomic seats that convert into fully flat beds. The thoughtful design ensures that passengers have plenty of space, privacy, and comfort throughout their journey. Each seat comes with direct aisle access, making it easy to get up and move around during long-haul flights. The beds are equipped with high-quality bedding, allowing passengers to relax and arrive well-rested at their destination.<br/><br/>Iberia’s Business Class is also designed with practicality in mind. Each seat offers plenty of personal storage, along with charging ports and USB outlets for your devices. Whether you need to work or unwind, Iberia Business Class is a haven of comfort and convenience.<br/><br/>A signature element of Iberia Business Class is its top-tier dining experience. The airline serves gourmet meals crafted by renowned Spanish chefs, bringing the flavors of Spain to the sky. Passengers can enjoy a variety of Mediterranean-inspired dishes made with fresh ingredients, paired with an excellent selection of Spanish wines. The meals are served on elegant tableware, adding a touch of refinement to the dining experience.',
                    facts_title: 'Interesting Facts About Iberia',
                    facts: '<b>Oldest Airline in Spain:</b> Founded in 1927, Iberia is Spain’s national airline and one of the oldest in the world<br/><br/> <b>Leader in Latin American Flights:</b> Iberia offers more flights between Europe and Latin America than any other airline, making it the go-to carrier for this region.<br/><br/> <b>Sustainability Commitment:</b> Iberia is part of the IAG (International Airlines Group) and has ambitious goals for reducing its carbon emissions and becoming more sustainable.<br/><br/> <b>Cultural Influence:</b> Iberia incorporates the rich culture of Spain into its service, from its cuisine to the design of its cabins.',
                },
                {
                    slug: 'hawaiian',
                    name: 'Hawaiian Airlines',
                    details:
                        'Hawaiian Airlines Business Class, also known as First Class on shorter domestic flights, brings the essence of Hawaii’s warmth and hospitality to the skies. As Hawaii’s largest airline, it offers a premium flying experience that captures the spirit of the islands through luxury and comfort. From the moment you board, you’ll be welcomed with the Aloha spirit, turning your flight into a peaceful and relaxing journey.',
                    title: 'Hawaiian Airlines Business Class:',
                    subtitle: 'Aloha in the Air',
                    second: 'Hawaiian Airlines - Business Class',
                    paragraph:
                        'Hawaiian Airlines Business Class is designed to reflect the islands’ beauty and tranquility. The airline’s Business Class cabins on long-haul international and transpacific flights feature fully lie-flat seats, offering maximum comfort for overnight journeys. These seats are spacious, adjustable, and provide ample privacy, making it easy for passengers to rest and rejuvenate before reaching their destination.<br/><br/>The cabin decor and design echo the serene beauty of Hawaii, with soothing colors and textures that remind passengers of the natural beauty of the islands. Whether you’re traveling for business or pleasure, Hawaiian Airlines Business Class ensures that you arrive refreshed and ready to explore.<br/><br/>A key highlight of Hawaiian Airlines Business Class is its in-flight dining experience. Passengers are treated to meals crafted by award-winning Hawaiian chefs, using local ingredients and flavors that reflect the rich culinary traditions of the islands. From fresh seafood to tropical fruits, each dish offers a taste of Hawaii that makes your journey even more special.',
                    facts_title: 'Interesting Facts About Hawaiian Airlines',
                    facts: '<b>Oldest U.S. Airline:</b> Founded in 1929, Hawaiian Airlines is the longest continuously operating airline in the United States.<br/><br/> <b>Mai Tai in the Sky:</b> Hawaiian Airlines serves more Mai Tais than any other airline in the world, offering passengers a taste of the islands with every flight.<br/><br/> <b>The Hawaiian Miles Program:</b> Hawaiian Airlines offers one of the most generous frequent flyer programs in the industry, with no blackout dates for awards.<br/><br/> <b>Eco-Friendly Efforts:</b> The airline has introduced several sustainability initiatives, including reducing fuel consumption and cutting plastic waste on flights.',
                },
                {
                    slug: 'american',
                    name: 'American Airlines',
                    details:
                        'American Airlines Flagship Business Class offers a premium travel experience tailored to meet the needs of both business and leisure travelers. As one of the largest airlines in the world, American Airlines has invested in enhancing its Business Class services to compete with the top global carriers. Whether youre flying cross-country or across the world, Flagship Business Class ensures a seamless and luxurious journey.',
                    title: 'American Airlines Flagship Business Class:',
                    subtitle: 'Redefining Luxury in the Skies',
                    second: 'American Airlines - Business Class',
                    paragraph:
                        'American Airlines Flagship Business Class is known for its fully lie-flat seats, offering passengers ample space, privacy, and comfort. Each seat has direct aisle access, making it convenient for passengers to move around without disturbing others. The seats are designed with ergonomic features, making it easy to adjust them for work, rest, or entertainment.<br/><br/>With custom bedding by Casper, a leading brand in sleep products, American Airlines ensures that passengers can enjoy restful sleep on long-haul flights. The seats come with high-quality pillows, duvets, and mattress pads to maximize comfort. Whether you’re flying overnight or during the day, the emphasis is on making sure you arrive feeling refreshed.<br/><br/>American Airlines Flagship Business Class sets itself apart with its in-flight dining options, featuring chef-curated meals that change seasonally. The airline has partnered with some of the top culinary talent to create a menu that caters to the tastes of discerning travelers. From fresh salads to gourmet entrees, every dish is prepared with quality ingredients and served on elegant tableware.',
                    facts_title: 'Interesting Facts About American Airlines',
                    facts: '<b>World’s Largest Airline:</b> American Airlines operates the largest fleet of any airline in the world, with more than 900 aircraft.<br/><br/> <b>Flagship Lounges:</b> American Airlines was the first U.S. airline to introduce Flagship Lounges, offering an elevated airport experience for premium passengers.<br/><br/> <b>Innovative Fleet:</b> American Airlines was one of the first carriers to introduce Boeing 777-300ER aircraft on its long-haul routes, known for their fuel efficiency and passenger comfort.<br/><br/> <b>Hollywood Favorite:</b> American Airlines has been featured in numerous films and TV shows, making it a pop culture icon in the aviation industry.',
                },
                {
                    slug: 'lufthansa',
                    name: 'Lufthansa',
                    details:
                        'As one of Europe’s leading airlines, Lufthansa offers a Business Class experience that seamlessly blends luxury with efficiency. Renowned for its attention to detail and quality of service, Lufthansa Business Class delivers comfort and sophistication, whether you’re flying short-haul across Europe or embarking on a long-haul journey around the world. With its extensive network and state-of-the-art aircraft, Lufthansa ensures that every journey in Business Class is an exceptional one.',
                    title: 'Lufthansa Business Class:',
                    subtitle: 'A Premium Experience Across the Globe',
                    second: 'Lufthansa - Business Class',
                    paragraph:
                        'When you enter Lufthansa Business Class, you are welcomed into a world of comfort and style. The Business Class seats are designed to provide ample space and relaxation, featuring fully lie-flat beds that allow passengers to sleep comfortably on long-haul flights. The cabin layout ensures each seat has direct aisle access, offering a high degree of privacy and convenience.<br/><br/>The ergonomic seat design is complemented by high-quality bedding, including soft blankets and large pillows. Whether you’re flying for business or leisure, Lufthansa’s Business Class ensures that you arrive at your destination well-rested and refreshed.<br/><br/>Lufthansa Business Class goes beyond traditional in-flight dining by offering a gourmet menu curated by award-winning chefs. Passengers can enjoy a diverse selection of meals, featuring both international dishes and regional German cuisine. Lufthansa takes pride in serving fresh, high-quality ingredients, ensuring each meal feels like a fine dining experience in the sky.',
                    facts_title: 'Interesting Facts About Lufthansa',
                    facts: '<b>Germany’s Flag Carrier:</b> Lufthansa is Germany’s largest airline and one of the founding members of the Star Alliance, the world’s largest airline alliance.<br/><br/> <b>Five-Star Airline:</b> Lufthansa is one of only a few airlines in the world to hold a prestigious Skytrax 5-Star rating for the quality of its service.<br/><br/> <b>First-Class Excellence:</b> In addition to its renowned Business Class, Lufthansa is famous for its First Class service, which includes dedicated terminals in Frankfurt and Munich for First Class passengers.<br/><br/> <b>One of Europe’s Oldest Airlines:</b> Lufthansa was founded in 1953 and has since become a symbol of premium air travel in Europe and worldwide.',
                },
                {
                    slug: 'swiss',
                    name: 'Swiss Air',
                    details:
                        'nown for its precision and elegant service, Swiss Air Business Class offers a refined and sophisticated flying experience. As the flag carrier of Switzerland, Swiss Air brings the country’s reputation for efficiency and attention to detail to every aspect of its Business Class offering. From luxurious seats to gourmet dining, flying with Swiss Air Business Class is a seamless blend of comfort and excellence, making it the perfect choice for discerning travelers.',
                    title: 'Swiss Air Business Class:',
                    subtitle: 'Precision, Elegance, and Comfort in the Skies',
                    second: 'The Swiss Air - Business Class',
                    paragraph:
                        'Step into Swiss Air Business Class, and you’ll find yourself in a cabin designed with both style and functionality. The Business Class seats, available on the airline’s long-haul fleet, are ergonomically designed to ensure maximum comfort. These seats convert into fully lie-flat beds, offering up to two meters of sleeping space, allowing passengers to rest comfortably on long-haul flights. The cabin layout, which ensures every seat has direct aisle access, provides privacy and easy mobility throughout the flight.<br/><br/>Swiss Air is renowned for its sleek and minimalist cabin design, featuring high-quality Swiss craftsmanship in every detail. The generous space, refined décor, and use of premium materials create an environment where passengers can relax and unwind, knowing that every element of their comfort has been considered.<br/><br/>Dining aboard Swiss Air Business Class is a culinary journey that showcases the best of Swiss and international cuisine. Passengers are treated to a multi-course gourmet meal, with dishes crafted by top chefs and inspired by the flavors of Switzerland. The menu often features Swiss specialties such as Zürcher Geschnetzeltes or Rösti, as well as a variety of international options',
                    facts_title: 'Interesting Facts About Swiss Air',
                    facts: '<b>Swiss Chocolates:</b> A signature of Swiss Air, passengers in Business Class are treated to high-quality Swiss chocolates during their flight.<br/><br/> <b>Swiss Wines:</b> Swiss Air is one of the few airlines to offer a curated selection of Swiss wines, showcasing the country’s impressive wine culture.<br/><br/> <b>First Class Service:</b> In addition to Business Class, Swiss Air offers a highly acclaimed First Class product, complete with private suites, exclusive lounges, and personalized service.<br/><br/> <b>The Heart of Europe:</b> Swiss Air operates out of Zurich Airport, one of the most efficient and well-connected hubs in Europe, making it an ideal choice for passengers traveling within or beyond the continent.',
                },
                {
                    slug: 'airserbia',
                    name: 'Air Serbia',
                    details:
                        'Air Serbia offers a distinct Business Class experience that reflects the warmth and hospitality of Serbia. As the national carrier of Serbia, Air Serbia combines comfort with a touch of Balkan charm to provide a unique flying experience. Whether you’re traveling for business or pleasure, Air Serbia Business Class ensures a journey that is both luxurious and memorable.',
                    title: 'Air Serbia Business Class:',
                    subtitle: 'An Elegant Gateway to the Balkans',
                    second: 'Air Serbia - Business Class',
                    paragraph:
                        'Air Serbia Business Class is designed to provide passengers with a high level of comfort and relaxation. The Business Class seats on their aircraft are designed with ample space and adjustable features to enhance your travel experience. Many of the seats convert into lie-flat beds, offering the perfect opportunity to rest on long-haul flights. With direct aisle access available from every seat, the cabin is arranged to prioritize your privacy and ease.<br/><br/>The cabin’s modern design and use of high-quality materials create an inviting atmosphere. Passengers will appreciate the thoughtful details, such as extra legroom and enhanced seat width, which contribute to a more enjoyable flight experience.<br/><br/>Dining in Air Serbia Business Class is a delightful experience that showcases the best of Serbian cuisine. Passengers can enjoy a variety of gourmet meals inspired by traditional Serbian dishes, including options like Ćevapi and Sarma. The airline places a strong emphasis on using fresh, local ingredients to ensure that each meal is flavorful and satisfying.',
                    facts_title: 'Interesting Facts About Air Serbia',
                    facts: '<b>Cultural Flair:</b> Air Serbia is known for incorporating Serbian cultural elements into its Business Class service, including traditional dishes and local hospitality.<br/><br/> <b>Etihad Partnership:</b> Air Serbia is a member of the Etihad Airways Partners, which allows for a broad network of connections and benefits for passengers.<br/><br/> <b>Belgrade Hub:</b> Belgrade Nikola Tesla Airport, the main hub for Air Serbia, is one of the busiest airports in the Balkans and a key gateway to the region.<br/><br/> <b>Regional Award:</b> Air Serbia has received various awards for its service quality and regional excellence, reflecting its commitment to providing top-notch travel experiences.',
                },
                {
                    slug: 'jordanianair',
                    name: 'Royal Jordanian',
                    details:
                        'Royal Jordanian offers a Business Class experience that embodies the elegance and hospitality of the Jordanian Royal Family. As the flag carrier of Jordan, Royal Jordanian blends luxury with cultural richness to provide a distinctive and memorable flying experience. Whether you’re embarking on a business trip or a leisure journey, Royal Jordanian Business Class ensures a refined and comfortable voyage.',
                    title: 'Royal Jordanian Business Class:',
                    subtitle: 'A Regal Experience Above the Clouds',
                    second: 'Royal Jordanian - Business Class',
                    paragraph:
                        'When you choose Royal Jordanian Business Class, you step into a cabin designed for supreme comfort and relaxation. The Business Class seats are crafted to offer generous space and privacy, with many of them converting into fully lie-flat beds for optimal rest. The seat design includes direct aisle access, ensuring that every passenger can move about easily and enjoy their journey without obstruction.<br/><br/> The cabin’s decor reflects a blend of modern sophistication and traditional Jordanian influences, creating an atmosphere of luxury and warmth. High-quality materials and meticulous attention to detail contribute to an inviting and serene environment, making each flight an enjoyable experience.<br/><br/>Dining in Royal Jordanian Business Class is a journey through Jordanian and Middle Eastern flavors. The airline’s menu features a selection of gourmet dishes, including traditional Jordanian specialties like Mansaf and Maqluba, as well as a variety of international options. Each meal is prepared with fresh, high-quality ingredients to ensure a delightful culinary experience.',
                    facts_title: 'Interesting Facts About Royal Jordanian',
                    facts: '<b>Jordanian Hospitality:</b> Royal Jordanian is renowned for its warm and welcoming service, reflecting the renowned hospitality of Jordan.<br/><br/> <b>Cultural Experience:</b> The airline incorporates Jordanian cultural elements into its Business Class service, including traditional dishes and local beverages.<br/><br/> <b>Oneworld Alliance:</b> Royal Jordanian is a member of the Oneworld alliance, providing passengers with a broad network of connections and benefits.<br/><br/> <b>Amman Hub:</b> Queen Alia International Airport in Amman is the main hub for Royal Jordanian, offering a key gateway to the Middle East and beyond.',
                },
                {
                    slug: 'philippine',
                    name: 'Philippine Airlines',
                    details:
                        'Philippine Airlines offers a Business Class experience that embodies the warmth and hospitality of the Philippines. As the country’s flag carrier, Philippine Airlines provides a blend of comfort, elegance, and exceptional service that makes each journey a memorable experience. Whether you’re traveling for business or leisure, Philippine Airlines Business Class ensures a luxurious and relaxing flight.',
                    title: 'Philippine Airlines Business Class:',
                    subtitle: 'A Gateway to Tropical Luxury',
                    second: 'Philippine Airlines - Business Class',
                    paragraph:
                        'Philippine Airlines Business Class is designed to offer passengers a high level of comfort and relaxation. The Business Class seats on their aircraft are designed with generous space and adjustable features to enhance your travel experience. Many of these seats convert into fully lie-flat beds, providing a restful environment on long-haul flights. Each seat includes direct aisle access, allowing easy movement and privacy for all passengers.<br/><br/>The cabin’s design reflects a modern and sophisticated aesthetic, with an emphasis on creating a serene and inviting atmosphere. The use of premium materials and attention to detail ensure that every aspect of the cabin contributes to a luxurious flying experience.<br/><br/>Dining in Philippine Airlines Business Class is a delightful experience that highlights the best of Filipino and international cuisine. The airline’s menu features a range of gourmet dishes, including traditional Filipino specialties like Adobo and Sinigang, as well as a variety of international options. Each meal is crafted with fresh, high-quality ingredients to ensure a satisfying and flavorful dining experience.',
                    facts_title: 'Interesting Facts About Philippine Airlines',
                    facts: '<b>Filipino Hospitality:</b> Philippine Airlines is known for its warm and friendly service, reflecting the renowned hospitality of the Philippines.<br/><br/> <b>Mabuhay Miles:</b> The airline’s loyalty program, Mabuhay Miles, offers various benefits and rewards for frequent travelers.<br/><br/> <b>Historical Significance:</b> Philippine Airlines is one of the oldest airlines in Asia, with a rich history of service and innovation.<br/><br/> <b>Manila Hub:</b> Ninoy Aquino International Airport in Manila is the main hub for Philippine Airlines, offering a key gateway to the Philippines and the broader Asia-Pacific region.',
                },
                {
                    slug: 'cathay',
                    name: 'Cathay Pacific',
                    details:
                        'Cathay Pacific offers a Business Class experience that epitomizes luxury and elegance in air travel. As one of Asia’s leading airlines, Cathay Pacific combines exceptional service with state-of-the-art amenities to provide a travel experience that is both sophisticated and comfortable. Whether you’re flying for business or leisure, Cathay Pacific Business Class ensures that every aspect of your journey is catered to with the utmost care',
                    title: 'Cathay Pacific Business Class:',
                    subtitle: 'A Premier Journey to the East',
                    second: 'Cathay Pacific - Business Class',
                    paragraph:
                        'When you choose Cathay Pacific Business Class, you enter a cabin designed for optimal comfort and relaxation. The Business Class seats are thoughtfully designed with generous space and a variety of adjustable features to enhance your flight experience. Many of the seats convert into fully lie-flat beds, providing a restful environment for long-haul flights. Direct aisle access is available from every seat, ensuring ease of movement and privacy throughout your journey.<br/><br/>The cabin’s contemporary design incorporates high-quality materials and an elegant color scheme, creating a serene and inviting atmosphere. Attention to detail in the cabin layout and seating ensures that every passenger can enjoy a luxurious and comfortable flying experience.<br/><br/>Dining in Cathay Pacific Business Class is a gourmet experience that highlights both Asian and international flavors. The airline’s menu features a selection of carefully crafted dishes, including regional specialties such as Dim Sum and Peking Duck, as well as a variety of global cuisines. Each meal is prepared with fresh, high-quality ingredients to deliver a satisfying and flavorful dining experience.',
                    facts_title: 'Interesting Facts About Cathay Pacific',
                    facts: '<b>Award-Winning Service:</b> Cathay Pacific has received numerous awards for its service quality, including accolades for its Business Class product.<br/><br/> <b>Hong Kong Hub:</b> Hong Kong International Airport is the main hub for Cathay Pacific, offering a key gateway to Asia and beyond.<br/><br/> <b>Oneworld Alliance:</b> Cathay Pacific is a member of the Oneworld alliance, providing passengers with a broad network of connections and benefits.<br/><br/> <b>Innovation:</b> The airline is known for its innovative approach to passenger comfort and service, continually enhancing its offerings to meet the needs of modern travelers',
                },
                {
                    slug: 'jetblue',
                    name: 'JetBlue',
                    details:
                        'JetBlue offers a Business Class experience that combines modern comfort with innovative service. Known for its friendly atmosphere and customer-focused approach, JetBlue provides a business travel experience that is both enjoyable and efficient. Whether you are flying for business or leisure, JetBlue Business Class ensures a comfortable and pleasant journey with a touch of personality.',
                    title: 'JetBlue Business Class:',
                    subtitle: 'Modern Comfort and Innovative Service',
                    second: 'JetBlue - Business Class',
                    paragraph:
                        'In JetBlue Business Class, passengers can enjoy a cabin designed with comfort and practicality in mind. The Business Class seats offer ample space and a range of adjustable features to enhance your travel experience. While JetBlue does not offer fully lie-flat beds in its premium cabin, the seats are designed for relaxation with generous legroom and recline options, making it ideal for both short and medium-haul flights<br/><br/>The cabin features a contemporary design with a focus on creating a welcoming and relaxed atmosphere. Modern amenities and thoughtful touches ensure that every passenger enjoys a comfortable and enjoyable flight.<br/><br/>Dining in JetBlue Business Class is a refreshing experience that highlights the airline’s commitment to quality and innovation. The menu features a variety of gourmet snacks and meals, including fresh salads, sandwiches, and other delicious options. JetBlue’s emphasis on quality ingredients ensures that each meal is satisfying and flavorful.',
                    facts_title: 'Interesting Facts About JetBlue',
                    facts: '<b>Customer-Centric Approach:</b> JetBlue is known for its customer-first approach, offering free Wi-Fi, complimentary snacks, and generous legroom.<br/><br/> <b>TrueBlue Program:</b> The airline’s TrueBlue loyalty program offers various rewards and benefits for frequent travelers.<br/><br/> <b>Innovative Features:</b> JetBlue is known for its innovative amenities, including free in-flight entertainment and a range of complimentary refreshments.<br/><br/> <b>Expansion Plans:</b> The airline continues to expand its route network, offering new destinations and increased connectivity across the Americas.',
                },
                {
                    slug: 'qantas',
                    name: 'Qantas',
                    details:
                        'Qantas offers a Business Class experience that epitomizes luxury and sophistication in air travel. As Australia’s flagship carrier, Qantas is renowned for its commitment to exceptional service, comfort, and innovative amenities. Whether you’re traveling domestically or internationally, Qantas Business Class ensures that your journey is marked by unparalleled comfort and elegance.',
                    title: 'Qantas Business Class:',
                    subtitle: 'Embrace the Pinnacle of Australian Luxury',
                    second: 'Qantas - Business Class',
                    paragraph:
                        'In Qantas Business Class, passengers are greeted with a cabin designed for maximum comfort and relaxation. The Business Class seats feature a sophisticated design that transforms into a fully lie-flat bed, ensuring a restful experience on long-haul flights. Direct aisle access from every seat enhances convenience and privacy, allowing for an uninterrupted journey.<br/><br/>The cabin’s interior reflects Qantas’ dedication to high standards of design and comfort, with premium materials, ambient lighting, and a modern aesthetic that creates a serene atmosphere. Attention to detail ensures that every aspect of the Business Class cabin contributes to a superior travel experience.<br/><br/>Dining in Qantas Business Class is a gourmet experience that celebrates both Australian and international cuisines. The menu features a range of exquisite dishes prepared with fresh, high-quality ingredients. Passengers can enjoy a selection of appetizers, main courses, and desserts that reflect Qantas’ commitment to culinary excellence.',
                    facts_title: 'Interesting Facts About Qantas',
                    facts: '<b>Australia’s Flagship Carrier:</b> Qantas is the national airline of Australia and one of the world’s oldest airlines.<br/><br/> <b>Oneworld Alliance:</b> Qantas is a founding member of the Oneworld alliance, offering extensive global connectivity.<br/><br/> <b>Innovative Features:</b> The airline is known for its innovation in passenger comfort and service, including the introduction of the Skybed seat.<br/><br/> <b>Environmental Initiatives:</b> Qantas is actively working on sustainability initiatives, including reducing carbon emissions and investing in fuel-efficient technology.',
                },
                {
                    slug: 'taportugal',
                    name: 'TAP Portugal',
                    details:
                        'TAP Portugal offers a Business Class experience that embodies the essence of Portuguese hospitality and elegance. As Portugal’s leading airline, TAP Portugal provides a refined travel experience with a focus on comfort, service, and cultural warmth. Whether traveling for business or leisure, TAP Portugal Business Class ensures that your journey is both luxurious and memorable.',
                    title: 'TAP Portugal Business Class:',
                    subtitle: 'Discover Portuguese Elegance in the Skies',
                    second: 'TAP Portugal - Business Class',
                    paragraph:
                        'In TAP Portugal Business Class, passengers are welcomed into a cabin designed to offer a high level of comfort and sophistication. The Business Class seats are thoughtfully designed to provide ample space and relaxation. Many seats convert into fully lie-flat beds, allowing you to arrive at your destination refreshed and ready.<br/><br/>The cabin’s design reflects a modern aesthetic with a touch of Portuguese charm, incorporating premium materials and ambient lighting to create a serene and inviting atmosphere. Each detail is carefully considered to enhance your comfort and enjoyment throughout the flight.<br/><br/>Dining in TAP Portugal Business Class is a culinary journey that highlights Portuguese and international flavors. The menu features a selection of gourmet dishes crafted with fresh, high-quality ingredients. Passengers can enjoy a range of appetizers, main courses, and desserts that showcase the best of Portuguese cuisine alongside global options.',
                    facts_title: 'Interesting Facts About TAP Portugal',
                    facts: '<b>Portuguese Hospitality:</b> TAP Portugal is known for its warm and friendly service, reflecting the best of Portuguese hospitality.<br/><br/> <b>Global Network:</b> The airline connects major cities across Europe, Africa, the Americas, and beyond.<br/><br/> <b>Star Alliance Member:</b> TAP Portugal is a member of the Star Alliance, offering extensive global connectivity.<br/><br/> <b>Cultural Touches:</b> The airline’s in-flight service often incorporates Portuguese cultural elements, providing a unique travel experience.',
                },
                {
                    slug: 'aircanada',
                    name: 'Air Canada',
                    details:
                        'Air Canada offers a Business Class experience that embodies the pinnacle of Canadian hospitality and comfort. As Canada’s flagship carrier, Air Canada is renowned for its commitment to exceptional service, modern amenities, and a superior travel experience. Whether traveling for business or leisure, Air Canada Business Class ensures that every journey is marked by sophistication and elegance.',
                    title: 'Air Canada Business Class:',
                    subtitle: 'Experience Canadian Excellence in the Skies',
                    second: 'Air Canada - Business Class',
                    paragraph:
                        'In Air Canada Business Class, passengers are welcomed into a cabin designed to offer the highest level of comfort and luxury. The Business Class seats are engineered for relaxation, featuring fully lie-flat beds that provide a restful environment for long-haul flights. Each seat is equipped with direct aisle access, ensuring privacy and convenience throughout your journey.<br/><br/>The cabin design reflects a contemporary aesthetic with premium materials and sophisticated lighting, creating an atmosphere of tranquility and style. Every detail is thoughtfully considered to enhance the overall comfort and enjoyment of your flight.<br/><br/>Dining in Air Canada Business Class is a gourmet experience that highlights Canadian and international cuisine. The menu features a selection of dishes crafted with fresh, high-quality ingredients, showcasing the best of Canadian culinary traditions alongside global flavors.',
                    facts_title: 'Interesting Facts About Air Canada',
                    facts: '<b>Flagship Carrier:</b> Air Canada is the largest airline in Canada and serves as the country’s flagship carrier.<br/><br/> <b>Star Alliance Member:</b> Air Canada is a member of the Star Alliance, offering extensive global connectivity.<br/><br/> <b>Innovative Comfort:</b> The airline is known for its commitment to passenger comfort, including the introduction of the Signature Service in Business Class.<br/><br/> <b>Sustainability Initiatives:</b>  Air Canada is actively working on sustainability initiatives, including reducing carbon emissions and investing in green technology.',
                },
                {
                    slug: 'saudi',
                    name: 'Saudi Arabian Airlines',
                    details:
                        'Saudi Arabian Airlines, known as Saudia, offers a Business Class experience that reflects the rich cultural heritage and modern luxury of Saudi Arabia. As the national carrier of Saudi Arabia, Saudia is dedicated to providing exceptional service, comfort, and sophistication. Whether traveling for business or pleasure, Saudi Arabian Airlines Business Class ensures a journey of elegance and relaxation.',
                    title: 'Saudi Arabian Airlines Business Class:',
                    subtitle: 'Experience Saudi Elegance and Comfort',
                    second: 'Saudi Arabian Airlines - Business Class',
                    paragraph:
                        'In Saudi Arabian Airlines Business Class, passengers are welcomed into a cabin designed for ultimate comfort and luxury. The Business Class seats feature state-of-the-art design, with many converting into fully lie-flat beds to provide a restful and rejuvenating experience on long-haul flights. Each seat offers direct aisle access, enhancing privacy and convenience throughout the journey.<br/><br/>The cabin’s interior reflects a blend of contemporary design and traditional Saudi elements, creating a sophisticated and inviting atmosphere. With premium materials and ambient lighting, the cabin is meticulously crafted to ensure a serene and enjoyable travel experience.<br/><br/>Dining in Saudi Arabian Airlines Business Class is a gourmet experience that celebrates Saudi and international cuisine. The menu features a range of dishes prepared with high-quality ingredients, offering a taste of Saudi Arabian culinary traditions alongside global flavors.',
                    facts_title: 'Interesting Facts About Saudi Arabian Airlines',
                    facts: '<b>National Carrier:</b> Saudi Arabian Airlines is the national carrier of Saudi Arabia and is known for its luxurious service.<br/><br/> <b>SkyTeam Member:</b> Saudia is a member of the SkyTeam alliance, offering extensive global connectivity.<br/><br/> <b>Cultural Elements:</b> The airline’s service often incorporates traditional Saudi Arabian elements, providing a unique travel experience.<br/><br/> <b>Innovative Fleet:</b> Saudia operates a modern fleet, including the B787 Dreamliner and A320neo.',
                },
                {
                    slug: 'korean',
                    name: 'Korean Air',
                    details:
                        'Korean Air offers a Business Class experience that combines Korean hospitality with advanced comfort and luxury. As South Korea’s flagship carrier, Korean Air is known for its commitment to providing top-tier service and an exceptional flying experience. Whether traveling for business or pleasure, Korean Air Business Class ensures that every journey is characterized by sophistication and comfort.',
                    title: 'Korean Air Business Class:',
                    subtitle: 'Experience Korean Elegance and Innovation',
                    second: 'Korean Air - Business Class',
                    paragraph:
                        'In Korean Air Business Class, passengers are welcomed into a cabin designed to offer the highest level of comfort and style. The Business Class seats feature innovative design elements, with many seats converting into fully lie-flat beds to provide a restful environment on long-haul flights. Each seat offers direct aisle access, enhancing privacy and convenience throughout the journey.<br/><br/>The cabin design reflects a harmonious blend of modern aesthetics and Korean cultural influences, creating a serene and sophisticated atmosphere. Premium materials, ambient lighting, and thoughtful design details contribute to a luxurious and enjoyable travel experience.<br/><br/>Dining in Korean Air Business Class is a culinary journey that highlights both Korean and international cuisine. The menu features a range of dishes prepared with high-quality ingredients, showcasing traditional Korean flavors alongside global favorites.',
                    facts_title: 'Interesting Facts About Korean Air',
                    facts: '<b>Flagship Carrier:</b> Korean Air is South Korea’s flagship carrier and is renowned for its luxurious service.<br/><br/> <b>SkyTeam Member:</b> Korean Air is a member of the SkyTeam alliance, offering extensive global connectivity.<br/><br/> <b>Innovative Fleet:</b> The airline operates a modern fleet, including the A380 and B787 Dreamliner.<br/><br/> <b>Cultural Touches:</b> The airline’s service often incorporates traditional Korean elements, providing a unique travel experience.',
                },
                {
                    slug: 'united',
                    name: 'United Airlines',
                    details:
                        'United Airlines offers a Business Class experience that sets the standard for comfort and service in the skies. As one of the major airlines in the United States, United is dedicated to providing passengers with an exceptional travel experience, blending modern luxury with practical amenities. Whether you’re embarking on a business trip or a leisure journey, United Airlines Business Class ensures that your flight is as enjoyable and stress-free as possible.',
                    title: 'United Airlines Business Class:',
                    subtitle: 'Elevate Your Travel Experience with United',
                    second: 'United Airlines - Business Class',
                    paragraph:
                        'In United Airlines Business Class, passengers are welcomed into a cabin designed for maximum comfort and convenience. The Business Class seats are equipped with cutting-edge features, including many that convert into fully lie-flat beds, providing a restful environment for long-haul flights. Each seat offers direct aisle access, enhancing both privacy and ease of movement.<br/><br/>The cabin’s design reflects a modern aesthetic, with premium materials and thoughtful touches that create a sophisticated and inviting atmosphere. The combination of comfort and elegance ensures that every flight is a pleasurable experience from start to finish.<br/><br/>Dining in United Airlines Business Class is a highlight of the journey, featuring a selection of gourmet dishes that cater to a variety of tastes. The menu includes a range of appetizers, main courses, and desserts, all prepared with high-quality ingredients to deliver a memorable dining experience.',
                    facts_title: 'Interesting Facts About United Airlines',
                    facts: '<b>Major U.S. Carrier:</b> United Airlines is one of the largest airlines in the United States, known for its extensive network.<br/><br/> <b>Star Alliance Member:</b> United is a member of the Star Alliance, offering broad global connectivity.<br/><br/><b>Modern Fleet:</b> The airline operates a modern fleet, including the B787 Dreamliner and B777<br/><br/> <b>Sustainability Efforts:</b> United is actively working on reducing its carbon footprint and investing in sustainable aviation practices.',
                },
                {
                    slug: 'airfrance',
                    name: 'Air France',
                    details:
                        'Air France offers a Business Class experience that epitomizes French sophistication and modern luxury. As one of Europe’s leading airlines, Air France is renowned for its commitment to providing an exceptional travel experience, combining elegance with cutting-edge amenities. Whether you’re traveling for business or pleasure, Air France Business Class ensures that every aspect of your journey is refined and enjoyable.',
                    title: 'Air France Business Class:',
                    subtitle: 'Experience French Elegance and Innovation',
                    second: 'Air France - Business Class',
                    paragraph:
                        'In Air France Business Class, passengers are welcomed into a cabin designed to offer unparalleled comfort and style. The Business Class seats feature a sophisticated design, with many seats converting into fully lie-flat beds to provide a restful environment on long-haul flights. Each seat offers direct aisle access, enhancing privacy and convenience throughout the journey.<br/><br/>The cabin’s interior reflects a modern French aesthetic, with premium materials and elegant design elements creating a chic and comfortable atmosphere. The combination of luxury and practicality ensures that every flight is a delightful experience<br/><br/>Dining in Air France Business Class is a gourmet journey that highlights both French and international culinary traditions. The menu features a selection of dishes prepared with high-quality ingredients, showcasing classic French cuisine alongside global favorites.',
                    facts_title: 'Interesting Facts About Air France',
                    facts: '<b>Flagship Carrier:</b> Air France is the flagship carrier of France and is known for its luxurious service and French elegance.<br/><br/> <b>SkyTeam Member:</b> Air France is a founding member of the SkyTeam alliance, offering extensive global connectivity.<br/><br/> <b><Iconic Fleet:/b> The airline operates a modern fleet, including the A350 and B787 Dreamliner.<br/><br/> <b>Culinary Excellence:</b> Air France is renowned for its gourmet dining options, reflecting the rich culinary traditions of France.',
                },
                {
                    slug: 'britishair',
                    name: 'British Airways',
                    details:
                        'British Airways offers a Business Class experience that epitomizes British elegance and global sophistication. As the United Kingdom’s flagship carrier, British Airways is known for its commitment to delivering an exceptional travel experience, combining classic British charm with modern luxury. Whether traveling for business or pleasure, British Airways Business Class ensures that every journey is marked by comfort and refinement.',
                    title: 'British Airways Business Class:',
                    subtitle: 'Discover British Elegance and Global Excellence',
                    second: 'British Airways - Business Class',
                    paragraph:
                        'In British Airways Business Class, passengers are welcomed into a cabin designed to offer the highest level of comfort and style. The Business Class seats feature a sleek design, with many seats transforming into fully lie-flat beds, ensuring that long-haul flights are as restful as possible. Each seat provides direct aisle access, enhancing privacy and convenience.<br/><br/>The cabin’s design reflects a modern British aesthetic, with premium materials and thoughtful design elements creating a sophisticated and cozy environment. The focus on comfort and elegance ensures that every flight is a pleasurable experience.<br/><br/>Dining in British Airways Business Class is a refined experience that highlights both British and international culinary traditions. The menu features a selection of dishes prepared with high-quality ingredients, showcasing classic British cuisine alongside global favorites.',
                    facts_title: 'Interesting Facts About British Airways',
                    facts: '<b>Flagship Carrier:</b> British Airways is the flagship carrier of the United Kingdom, known for its high standards of service and British charm.<br/><br/> <b>Oneworld Member:</b> British Airways is a founding member of the Oneworld alliance, offering extensive global connectivity.<br/><br/> <b>Modern Fleet:</b> The airline operates a modern fleet, including the A350 and B787 Dreamliner<br/><br/> <b>Historical Significance:</b> ritish Airways has a rich history and was formed through the merger of several historic airlines, including British Overseas Airways Corporation (BOAC) and British European Airways (BEA).',
                },
                {
                    slug: 'ethiopianair',
                    name: 'Ethiopian Airlines',
                    details:
                        'Ethiopian Airlines offers a Business Class experience that showcases the excellence of African aviation. As Africa’s largest and most awarded airline, Ethiopian Airlines is renowned for its commitment to quality and service, combining modern luxury with a touch of African hospitality. Whether you’re traveling for business or leisure, Ethiopian Airlines Business Class ensures a journey that is both comfortable and memorable.',
                    title: 'Ethiopian Airlines Business Class:',
                    subtitle: 'Discover the Excellence of African Aviation',
                    second: 'Ethiopian Airlines - Business Class',
                    paragraph:
                        'In Ethiopian Airlines Business Class, passengers are greeted with a cabin designed for maximum comfort and relaxation. The Business Class seats are thoughtfully designed, with many seats converting into fully lie-flat beds to ensure a restful environment on long-haul flights. Each seat provides direct aisle access, enhancing both privacy and convenience.<br/><br/>The cabin’s interior reflects a modern and elegant design, with high-quality materials and stylish decor that create a welcoming and refined atmosphere. The emphasis on comfort and luxury ensures that every flight is a pleasant experience from start to finish.<br/><br/>Dining in Ethiopian Airlines Business Class is a culinary adventure that highlights both African and international cuisine. The menu features a selection of dishes prepared with fresh, high-quality ingredients, showcasing the rich flavors of Ethiopian cuisine alongside global favorites.',
                    facts_title: 'Interesting Facts About Ethiopian Airlines',
                    facts: '<b>African Leader:</b> Ethiopian Airlines is Africa’s largest and most awarded airline, known for its extensive network and high-quality service.<br/></br> <b>Star Alliance Member:</b> Ethiopian Airlines is a member of the Star Alliance, offering broad global connectivity.<br/><br/> <b>Modern Fleet:</b> The airline operates a modern fleet, including the B787 Dreamliner and A350.<br/><br/> <b>Rich Heritage:</b> Ethiopian Airlines has a long history, established in 1945, and is one of the world’s oldest airlines.',
                },
                {
                    slug: 'latam',
                    name: 'LATAM Airlines',
                    details:
                        'LATAM Airlines offers a Business Class experience that embodies South American luxury and innovation. As one of the largest airlines in Latin America, LATAM Airlines is renowned for its commitment to delivering exceptional service and modern amenities. Whether traveling for business or leisure, LATAM Airlines Business Class ensures a journey characterized by comfort, style, and regional flair.',
                    title: 'LATAM Airlines Business Class:',
                    subtitle: 'Experience South American Luxury and Innovation',
                    second: 'LATAM Airlines - Business Class',
                    paragraph:
                        'In LATAM Airlines Business Class, passengers are welcomed into a cabin designed to offer superior comfort and sophistication. The Business Class seats are crafted with modern elegance, many converting into fully lie-flat beds to provide a restful environment on long-haul flights. Each seat offers direct aisle access, enhancing privacy and convenience.<br/><br/> The cabin’s interior reflects a contemporary design with premium materials and thoughtful touches that create a serene and stylish atmosphere. The focus on comfort and luxury ensures that every flight is a pleasurable experience, allowing passengers to relax and rejuvenate.<br/><br/>Dining in LATAM Airlines Business Class is a culinary journey that celebrates both Latin American and international flavors. The menu features a selection of dishes prepared with fresh, high-quality ingredients, highlighting the rich culinary traditions of South America alongside global favorites.',
                    facts_title: 'Interesting Facts About LATAM Airlines',
                    facts: '<b>Largest Latin American Airline:</b> LATAM Airlines is the largest airline in Latin America, known for its extensive network and high-quality service.<br/><br/> <b>Oneworld Member:</b> LATAM Airlines is a member of the Oneworld alliance, offering broad global connectivity.<br/><br/> <b>Modern Fleet:</b> The airline operates a modern fleet, including the A350 and B787 Dreamliner.<br/><br/> <b>Cultural Richness:</b> LATAM Airlines celebrates the diverse cultures of Latin America through its in-flight service and culinary offerings.',
                },
                {
                    slug: 'finnair',
                    name: 'Finnair',
                    details:
                        'Finnair offers a Business Class experience that embodies Nordic elegance and efficiency. As Finland’s flagship carrier, Finnair is renowned for its commitment to delivering a high-quality travel experience with a touch of Scandinavian sophistication. Whether you’re traveling for business or pleasure, Finnair Business Class promises a journey marked by comfort, style, and exceptional service.',
                    title: 'Finnair Business Class:',
                    subtitle: 'Embrace Nordic Elegance and Efficiency',
                    second: 'Finnair - Business Class',
                    paragraph:
                        'In Finnair Business Class, passengers are welcomed into a cabin designed to offer superior comfort and tranquility. The Business Class seats are crafted with modern elegance, many converting into fully lie-flat beds to ensure a restful environment on long-haul flights. Each seat provides direct aisle access, enhancing both privacy and convenience.<br/><br/>The cabin’s interior reflects a contemporary Nordic design, with high-quality materials and stylish decor that create a serene and sophisticated atmosphere. The focus on comfort and luxury ensures that every flight is a pleasant experience, allowing passengers to relax and rejuvenate.<br/><br/>Dining in Finnair Business Class is a culinary journey that celebrates both Scandinavian and international cuisine. The menu features a selection of dishes prepared with fresh, high-quality ingredients, highlighting the rich flavors of Finnish cuisine alongside global favorites.',
                    facts_title: 'Interesting Facts About Finnair',
                    facts: '<b>Nordic Excellence:</b> Finnair is known for its Nordic excellence and efficiency, reflecting the best of Scandinavian design and service.<br/><br/> <b>Oneworld Member:</b> Finnair is a member of the Oneworld alliance, offering broad global connectivity.<br/><br/> <b>Modern Fleet:</b> The airline operates a modern fleet, including the A350 and B787 Dreamliner<br/><br/> <b>Historical Significance:</b> Finnair is one of the world’s oldest airlines, established in 1923.',
                },
                {
                    slug: 'aireu',
                    name: 'Air Europa',
                    details:
                        'Air Europa offers a Business Class experience that exemplifies Spanish sophistication and modern comfort. As Spain’s leading international airline, Air Europa is dedicated to providing a premium travel experience that combines luxury with the warmth of Spanish hospitality. Whether you’re flying for business or leisure, Air Europa Business Class ensures a journey that is both elegant and memorable.',
                    title: 'Air Europa Business Class:',
                    subtitle: 'Discover Spanish Sophistication in the Skies',
                    second: 'Air Europa - Business Class',
                    paragraph:
                        'In Air Europa Business Class, passengers are welcomed into a cabin designed for maximum relaxation and style. The Business Class seats are designed with comfort in mind, many converting into fully lie-flat beds to provide a restful environment on long-haul flights. Each seat offers direct aisle access, enhancing both privacy and convenience.<br/><br/>The cabin’s interior features a contemporary design with high-quality materials and stylish accents that create a refined and inviting atmosphere. The focus on comfort and luxury ensures that every flight is a pleasant experience, allowing passengers to unwind and enjoy their journey.<br/><br/>Dining in Air Europa Business Class is a culinary delight that showcases both Spanish and international flavors. The menu features a range of dishes prepared with fresh, high-quality ingredients, highlighting the rich culinary traditions of Spain alongside global favorites.',
                    facts_title: 'Interesting Facts About Air Europa',
                    facts: '<b>Spanish Excellence:</b> Air Europa is Spain’s leading international airline, known for its high-quality service and modern fleet.<br/><br/> <b>SkyTeam Member:</b> Air Europa is a member of the SkyTeam alliance, offering broad global connectivity.<br/><br/> <b>Modern Fleet:</b> The airline operates a modern fleet, including the A350 and B787 Dreamliner.<br/><br/> <b>Award-Winning Service:</b> Air Europa has received numerous awards for its service and in-flight experience.',
                },
                {
                    slug: 'austrianair',
                    name: 'Austrian Airlines',
                    details:
                        'Austrian Airlines offers a Business Class experience that embodies Alpine luxury and charm. As Austria’s flagship carrier, Austrian Airlines is renowned for its commitment to delivering a premium travel experience that combines sophisticated comfort with Austrian hospitality. Whether traveling for business or leisure, Austrian Airlines Business Class ensures a journey that is both elegant and memorable.',
                    title: 'Austrian Airlines Business Class:',
                    subtitle: 'Experience Alpine Luxury and Charm',
                    second: 'Austrian Airlines - Business Class',
                    paragraph:
                        'In Austrian Airlines Business Class, passengers are welcomed into a cabin designed for maximum relaxation and style. The Business Class seats are designed with comfort in mind, many converting into fully lie-flat beds to provide a restful environment on long-haul flights. Each seat offers direct aisle access, enhancing both privacy and convenience<br/><br/>The cabin’s interior features a contemporary design with high-quality materials and stylish accents that reflect Austrian elegance. The focus on comfort and luxury ensures that every flight is a pleasant experience, allowing passengers to unwind and enjoy their journey.<br/><br/>Dining in Austrian Airlines Business Class is a culinary adventure that highlights both Austrian and international flavors. The menu features a selection of dishes prepared with fresh, high-quality ingredients, showcasing the rich culinary traditions of Austria alongside global favorites.',
                    facts_title: 'Interesting Facts About Austrian Airlines',
                    facts: '<b>Austrian Excellence:</b> Austrian Airlines is known for its commitment to Austrian hospitality and efficiency.<br/><br/> <b>Star Alliance Member:</b> Austrian Airlines is a member of the Star Alliance, offering broad global connectivity.<br/><br/> <b>Modern Fleet:</b> The airline operates a modern fleet, including the A321neo and B777<br/><br/> <b>Viennese Charm:</b> The airline incorporates elements of Viennese culture and charm into its service and cabin design.',
                },
                {
                    slug: 'delta',
                    name: 'Delta Air Lines',
                    details:
                        'Delta Air Lines offers a Business Class experience that stands as a benchmark in the world of air travel. Renowned for its commitment to passenger comfort and service, Delta provides an exceptional travel experience that combines luxury with unparalleled convenience. Whether for business or leisure, Delta Business Class ensures every journey is marked by sophistication and excellence.',
                    title: 'Delta Air Lines Business Class:',
                    subtitle: 'Redefining Comfort and Excellence in the Sky',
                    second: 'Delta Air Lines - Business Class',
                    paragraph:
                        'Stepping into Delta’s Business Class, you enter a cabin designed for superior comfort and privacy. The Business Class seats are ergonomically designed to convert into fully lie-flat beds, allowing you to arrive at your destination refreshed and well-rested. Each seat features direct aisle access, maximizing convenience and minimizing disruptions.<br/><br/>The cabin’s design reflects modern elegance, with high-quality materials and meticulous attention to detail. The combination of thoughtful design and advanced technology ensures that every moment of your flight is as relaxing and enjoyable as possible.<br/><br/>In Delta Business Class, dining is elevated to an art form. Passengers are treated to a menu crafted by top chefs, offering a variety of gourmet meals that cater to diverse tastes. The culinary experience includes a selection of fresh, seasonal dishes prepared with the finest ingredients.',
                    facts_title: 'Interesting Facts About Delta Air Lines',
                    facts: '<b>Innovation Leader:</b> Delta is known for its innovative approach to in-flight comfort and technology.<br/><br/> <b>Extensive Network:</b> Delta operates one of the largest route networks globally, connecting numerous destinations across six continents.<br/><br/> <b>SkyMiles Program:</b> The SkyMiles program offers extensive benefits and rewards for frequent travelers<br/><br/> <b>Commitment to Sustainability:</b> Delta is actively working to reduce its carbon footprint through various environmental initiatives.',
                },
            ],
            cities: ['New York', 'London', 'Paris', 'Tokyo', 'Dubai'],
            departureList: [
                { id: 1, name: 'Europe', old_price: 1200, price_today: 900 },
                { id: 2, name: 'Asia', old_price: 1500, price_today: 1000 },
                { id: 3, name: 'Indian Subcontinent', old_price: 1200, price_today: 900 },
                { id: 4, name: 'Middle East', old_price: 1500, price_today: 1000 },
                { id: 5, name: 'Africa', old_price: 1200, price_today: 900 },
                { id: 6, name: 'Oceania', old_price: 1500, price_today: 1000 },
                { id: 7, name: 'Latin America', old_price: 1500, price_today: 1000 },
            ],
        }
    },
    computed: {
        airline() {
            return this.airlines.find((airline) => airline.slug === this.slug)
        },
    },
}
</script>

<style lang="scss">
.container-airline {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    height: 100vh;
    overflow: hidden;
    background-image: url('@/assets/images/static/europe.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
        height: auto;
        padding: 20px;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 10px;
        height: auto;
        padding: 30px;
        background-size: cover;
    }
}

.content-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    max-width: 100%;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
        padding-top: 30%;
    }
}

.airline-details {
    padding: 24px;
    border-radius: 8px;
    color: white;
    max-width: 50%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);

    @media (max-width: 1024px) {
        max-width: 70%;
    }

    @media (max-width: 768px) {
        max-width: 90%;
        padding: 16px;
    }

    @media (max-width: 480px) {
        max-width: 100%;
        padding: 12px;
    }
}

.second-block {
    width: 35%;
    height: 30%;

    @media (max-width: 1024px) {
        width: 45%;
        height: auto;
    }

    @media (max-width: 768px) {
        width: 80%;
        height: auto;
    }

    @media (max-width: 480px) {
        width: 100%;
        height: auto;
    }
}
</style>
