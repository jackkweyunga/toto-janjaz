<!-- src/lib/components/PaymentForm.svelte -->
<script lang="ts">
    import {onMount, onDestroy} from 'svelte';
    import type {PaymentRequest} from '$lib/server/services/zenopay';
    import {Input} from "$lib/components/ui/input";
    import {Label} from "$lib/components/ui/label";
    import {Button} from "$lib/components/ui/button";
    import type {users} from "$lib/server/db/schema";

    export let amount: number;
    export let transactionId: string | undefined;
    export let user: typeof users.$inferSelect;
    export let onSuccess: (response: any) => void = () => {
    };
    export let onError: (error: any) => void = () => {
    };

    let loading = false;
    let phone = '';
    let email = user?.email || '';
    let name = user?.name || '';
    let error = '';
    let success = '';
    let statusCheckInterval: number;

    const checkStatus = async () => {
        try {
            const response = await fetch(`/api/payments/${transactionId}/status`);
            const data = await response.json();

            if (data.status === 'COMPLETED') {
                clearInterval(statusCheckInterval);
                success = 'Payment completed successfully!';
                onSuccess(data);
            } else if (data.status === 'FAILED') {
                clearInterval(statusCheckInterval);
                error = 'Payment failed';
                onError(data);
            }

        } catch (err) {
            console.error('Status check failed:', err);
        }
    };

    const handleSubmit = async () => {
        error = '';
        success = '';
        loading = true;

        try {
            const request: PaymentRequest = {
                amount,
                phone,
                email,
                name,
                transactionId,
                metadata: {
                    timestamp: new Date().toISOString(),
                }
            };

            const response = await fetch('/api/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Payment failed');
            }

            success = 'Payment initiated successfully, Please Check your phone to complete Authorisation!';
            transactionId = data.transactionId;

            // Start status checking
            statusCheckInterval = setInterval(checkStatus, 5000) as unknown as number;
        } catch (err) {
            // @ts-ignore
            error = err?.message || 'Payment failed';
            onError(err);
        } finally {
            loading = false;
        }
    };

    onDestroy(() => {
        if (statusCheckInterval) {
            clearInterval(statusCheckInterval);
        }
    });

</script>

<div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Make Payment</h2>

    <!--    Payment id -->
    <h4 class="text-lg text-muted-foreground mb-4">Payment ID: {transactionId}</h4>

    {#if error}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            {error}
        </div>
    {/if}

    {#if success}
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
            {success}
        </div>
    {/if}

    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div>
            <Label class="block text-sm font-medium text-gray-700">Parent/Guardian Name</Label>
            <Input
                    type="text"
                    bind:value={name}
                    required
            />
        </div>

        <div>
            <Label class="block text-sm font-medium text-gray-700">Phone Number to pay with</Label>
            <Input
                    type="tel"
                    bind:value={phone}
                    required
                    placeholder="255XXXXXXXXX"
            />
        </div>

        <div>
            <Label class="block text-sm font-medium text-gray-700">Email</Label>
            <Input
                    type="email"
                    bind:value={email}
                    required
            />
        </div>

        <div>
            <Label class="block text-sm font-medium text-gray-700">Amount</Label>
            <Input
                    type="number"
                    value={amount}
                    disabled
            />
        </div>

        <Button
                type="submit"
                disabled={loading}
        >
            {#if loading}
                Processing...
            {:else}
                Pay Now
            {/if}
        </Button>
    </form>
</div>