<script lang="ts">
    import {type PageData} from './$types';
    import {Label} from "$lib/components/ui/label";
    import {Badge} from "$lib/components/ui/badge";

    let {data}: { data: PageData } = $props();

    const {
        transactions,
        stats,
        user
    } = data;

    // Format date helper
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

</script>

<div class="grid gap-4 p-4">

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-700">Transactions</h3>
            <p class="text-3xl font-bold text-blue-600">{stats?.transactions.count || 0}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-700">Collections</h3>
            <p class="text-3xl font-bold text-green-600">{stats?.transactions.collections || 0}</p>
        </div>
    </div>

    <!-- RSVPs List -->
    <div class="bg-white rounded-lg shadow mt-4">
        <div class="p-6">
            {#if transactions?.length > 0}
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                        <tr class="border-b">
                            <th class="text-left p-2">Status</th>
                            <th class="text-left p-2">Child</th>
                            <th class="text-left p-2">Event</th>
                            <th class="text-left p-2">Payment</th>
                            <th class="text-left p-2">Created</th>
                        </tr>
                        </thead>
                        <tbody>
                        {#each transactions as tx}
                            <tr class="border-b hover:bg-gray-50">
                                <td class="p-2">
                                    <Badge
                                            variant={`${tx.status === 'completed' ? 'outline' : 'secondary'}`}
                                    >
                                        {tx.status}
                                    </Badge>
                                </td>
                                <td class="p-2">
                                    <div class="flex flex-col gap-2">
                                        <h3>{tx?.rsvp?.child?.fullName || 'N/A'}</h3>
                                        <Label class="text-muted-foreground">{tx?.rsvp?.child?.parent?.name}</Label>
                                        <a class="text-primary cursor-pointer font-bold" href={`tel:${tx?.rsvp?.child?.emergencyContact}`}>
                                            <Label>
                                                {tx?.rsvp?.child?.emergencyContact}
                                            </Label>
                                        </a>
                                    </div>
                                </td>
                                <td class="p-2">{tx?.rsvp?.event?.name || 'N/A'}</td>
                                <td class="p-2">
                                    {#if tx?.status === 'completed'}
                                        <Badge>✓ Paid</Badge>
                                    {:else}
                                        <Badge variant="outline">
                                            {tx?.status || 'N/A'}
                                        </Badge>
                                    {/if}
                                </td>
                                <td class="p-2">{formatDate(tx.createdAt)}</td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            {:else}
                <div class="text-center py-8 text-gray-500">
                    No RSVPs found
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    /* Any additional custom styles can go here */
</style>