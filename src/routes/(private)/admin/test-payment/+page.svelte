<script lang="ts">
    import PaymentForm from '$lib/components/payment-form.svelte';
    import {type PageData} from "./$types";
    const {data}: { data: PageData } = $props();

    const {user} = data;
    const handlePaymentSuccess = (response: any) => {
        console.log('Payment successful:', response);
    };

    const handlePaymentError = (error: any) => {
        console.error('Payment failed:', error);
    };
</script>

<PaymentForm
        amount={1000}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        user={user}
        transactionId={undefined}
/>
