<template>
    <div class="team-section">
        <!-- Containerul de sus cu titlu și descriere -->
        <div class="team-header-second">
            <h2 style="font-family: 'SSP-bold'">Your Personal Travel Managers</h2>
            <p style="font-family: 'Inter', sans-serif; line-height: 24px; font-weight: 400; color: #8e969e">
                We believe in one-on-one service.<br />
                When you book with us, you'll be paired with your very own Personal Travel Manager who will handle<br />
                everything – from itinerary planning to post-flight follow-ups.
            </p>
        </div>

        <!-- Containerul de jos cu imaginile și numele -->
        <div class="team-grid">
            <div class="team-member" v-for="member in teamMembers" :key="member.name">
                <img
                    :src="require(`@/assets/images/static/${member.image}`)"
                    :alt="member.name"
                    loading="lazy"
                    decoding="async"
                />
                <h3>{{ member.name }}</h3>
                <p>{{ member.role }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Lista membrilor echipei, fiecare cu nume, rol și imagine
            teamMembers: [
                { name: 'Jessica', role: 'Travel Expert', image: 'theodor.webp' },
                { name: 'Julia', role: 'Customer Service Manager', image: 'marcel.webp' },
                { name: 'Michael', role: 'Sales Manager', image: 'roberta.webp' },
            ],
        }
    },
}
</script>

<style scoped>
.team-section {
    padding: 40px;
    color: #fff;
    text-align: center;
    padding-bottom: 8%;
}
.team-header-second {
    padding: 24px;
    border: 1px solid #b4853b;
}

.team-header-second h2 {
    font-size: 36px;
    margin-bottom: 10px;
}

.team-header-second p {
    padding-top: 20px;
    font-size: 16px;
    color: #ccc;
    line-height: 1.5;
}

/* Layout de bază */
.team-grid {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 40px;
}

/* Dimensiunea de bază pentru imagini și secțiuni */
.team-member {
    flex: 1;
    max-width: 23%; /* Ajustează lățimea fiecărui membru */
    text-align: center;
}

.team-member img {
    width: 100%;
    min-height: 550px; /* Ajustează înălțimea pentru consistență */
    object-fit: cover;
    border-radius: 8px;
}

.team-member h3 {
    font-size: 18px;
    margin-top: 10px;
    font-family: 'SSP-bold';
}

.team-member p {
    font-size: 14px;
    color: #8e969e;
    line-height: 24px;
    font-weight: bold;
    font-family: 'Inter', sans-serif;
}

/* Media Queries pentru ecrane mai mici */

/* La tablete (max-width 1024px) */
@media (max-width: 1024px) {
    .team-grid {
        flex-direction: column;
        align-items: center;
    }

    .team-member {
        max-width: 90%; /* Asigură că imaginile sunt centrate și ocupă majoritatea spațiului */
        margin-bottom: 20px;
    }
}

@media (max-width: 768px) {
    .team-grid {
        flex-direction: column;
        align-items: center;
    }

    .team-member {
        max-width: 100%; /* Ocupă întreaga lățime pe ecrane mici */
        margin-bottom: 20px;
    }

    .team-member img {
        max-height: 350px; /* Ajustează înălțimea pentru ecrane mici */
    }
}
</style>
