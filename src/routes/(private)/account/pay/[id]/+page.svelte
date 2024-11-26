<script lang="ts">
    import PaymentForm from '$lib/components/payment-form.svelte';
    import {type PageData} from "./$types";
    import {toast} from "svelte-sonner";
    import {Card, CardContent} from "$lib/components/ui/card/index.js";
    import {Button} from "$lib/components/ui/button";
    import {onMount} from "svelte"
    import {writable} from "svelte/store";

    const {data}: { data: PageData } = $props();

    const {transaction, user} = data;

    const handlePaymentSuccess = (response: any) => {
        console.log('Payment successful:', response);
        toast.success('Payment successful');
    };

    const handlePaymentError = (error: any) => {
        console.error('Payment failed:', error);
    };

    let checkingStatus = writable(true);

    onMount(() => {

        (async () => {
            await fetch(`/api/payments/${transaction?.id}/status`)
                .then(response => response.json())
                .then(data => {
                    $checkingStatus = false;
                    if (data.status === 'COMPLETED') {
                        handlePaymentSuccess(data);
                    } else if (data.status === 'FAILED') {
                        handlePaymentError(data);
                    }
                })
                .catch(err => {
                    $checkingStatus = false;
                    console.error('Status check failed:', err);
                });
        })();
    })

</script>

{#if user }

    {#if transaction?.status !== "completed" && !$checkingStatus}
        <PaymentForm
                amount={parseInt(transaction?.amount || "0")}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                transactionId={transaction?.id}
                user={user}
        />
    {:else if $checkingStatus}
        <div class="container py-12">
            <Card class="max-w-md mx-auto border-primary">
                <CardContent class="flex flex-col gap-6">
                    <div class="flex justify-between items-center">
                        <h2 class="text-2xl font-bold">Payment</h2>
                    </div>
                    <div class="flex justify-between items-center">
                        <p class="text-lg text-primary">Checking payment status...</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    {:else }
        <div class="container py-12">
            <Card class="max-w-md mx-auto border-primary">
                <CardContent class="flex flex-col gap-6">
                    <div class="flex justify-between items-center">
                        <h2 class="text-2xl font-bold">Payment</h2>
                    </div>
                    <div class="flex justify-between items-center">
                        <p class="text-lg text-primary">Payment completed successfully</p>
                    </div>

                    <div class="flex gap-4">
                        <a href="/account">
                            <Button variant="secondary" size="lg">
                                Go to RSVPs
                            </Button>
                        </a>
                        <a href="/account/events">
                            <Button variant="secondary" size="lg">
                                Go to events
                            </Button>
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>

    {/if}
{:else}
    <p>User not found</p>
{/if}