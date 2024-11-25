<script lang="ts">
    import PaymentForm from '$lib/components/payment-form.svelte';
    import {type PageData} from "./$types";

    const {data}: { data: PageData } = $props();

    const {transaction, user} = data;

    const handlePaymentSuccess = (response: any) => {
        console.log('Payment successful:', response);
    };

    const handlePaymentError = (error: any) => {
        console.error('Payment failed:', error);
    };

</script>

{#if user }
    <PaymentForm
            amount={parseInt(transaction?.amount || "0")}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            transactionId={transaction?.id}
            user={user}
    />
{:else}
    <p>User not found</p>
{/if}