<template>
    <div class="personal-assistant">
        <h5>24/7 LIVE SERVICE</h5>
        <div class="d-flex">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.99935 6.66634C9.10392 6.66634 9.99935 5.77091 9.99935 4.66634C9.99935 3.56177 9.10392 2.66634 7.99935 2.66634C6.89478 2.66634 5.99935 3.56177 5.99935 4.66634C5.99935 5.77091 6.89478 6.66634 7.99935 6.66634ZM7.99935 7.99967C9.8403 7.99967 11.3327 6.50729 11.3327 4.66634C11.3327 2.82539 9.8403 1.33301 7.99935 1.33301C6.1584 1.33301 4.66602 2.82539 4.66602 4.66634C4.66602 6.50729 6.1584 7.99967 7.99935 7.99967Z"
                    fill="#DADDE0"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6 10.6663C4.52724 10.6663 3.33333 11.8602 3.33333 13.333V13.9997C3.33333 14.3679 3.03486 14.6663 2.66667 14.6663C2.29848 14.6663 2 14.3679 2 13.9997V13.333C2 11.1239 3.79086 9.33301 6 9.33301H10C12.2091 9.33301 14 11.1239 14 13.333V13.9997C14 14.3679 13.7015 14.6663 13.3333 14.6663C12.9651 14.6663 12.6667 14.3679 12.6667 13.9997V13.333C12.6667 11.8602 11.4728 10.6663 10 10.6663H6Z"
                    fill="#DADDE0"
                />
            </svg>
            <p>Personal Assistant</p>
        </div>
        <p class="call">Call us to lock in your low fare right now</p>
        <a :href="`tel:${$store.state.app.settings?.number}`" class="phone">{{ $store.state.app.settings?.number }}</a>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.personal-assistant {
    padding: 24px;
    flex-grow: 1;
    background: #1a1d1f8f;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    * {
        font-family: 'Inter', sans-serif;
        text-align: center;
        justify-content: center;
    }
    > h5 {
        font-size: 10px;
        font-weight: 600;
        line-height: 16px;
    }
    > .d-flex {
        gap: 8px;
        margin-bottom: 24px;
        > * {
            font-weight: 600;
        }
    }
    > h5,
    .phone {
        color: #b4853b;
    }
    > .phone {
        font-weight: 700;
        font-size: 20px;
    }
    > .d-flex,
    .call {
        color: #dadde0;
    }
    > .call {
        line-height: 16px;
        font-weight: 400;
        font-size: 13px;
    }
    @media (max-width: 768px) {
        align-items: center;
        > .phone {
            margin-left: 25%;
        }
    }
}
</style>
