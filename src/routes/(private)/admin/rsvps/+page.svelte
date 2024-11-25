<script lang="ts">
    import {type PageData} from './$types';
    import {Label} from "$lib/components/ui/label";

    let {data}: { data: PageData } = $props();

    const {
        rsvps,
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
            <h3 class="text-lg font-semibold text-gray-700">Total RSVPs</h3>
            <p class="text-3xl font-bold text-blue-600">{stats?.rsvps.count || 0}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-700">Total Children</h3>
            <p class="text-3xl font-bold text-green-600">{stats?.children.count || 0}</p>
        </div>
    </div>

    <!-- RSVPs List -->
    <div class="bg-white rounded-lg shadow mt-4">
        <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Recent RSVPs</h3>
            {#if rsvps?.length > 0}
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
                        {#each rsvps as rsvp}
                            <tr class="border-b hover:bg-gray-50">
                                <td class="p-2">
                                        <span class="px-2 py-1 rounded-full text-sm {rsvp.transaction?.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                                            {rsvp.transaction?.status}
                                        </span>
                                </td>
                                <td class="p-2">
                                    <div class="flex flex-col">
                                        <h3>{rsvp?.child?.fullName || 'N/A'}</h3>
                                        <Label class="text-muted-foreground">{rsvp?.child?.parent?.name}</Label>
                                    </div>
                                </td>
                                <td class="p-2">{rsvp?.event?.name || 'N/A'}</td>
                                <td class="p-2">
                                    {#if rsvp.transaction?.status === 'completed'}
                                        <span class="text-green-600">✓ Paid</span>
                                    {:else}
                                        <span class="text-red-600">
                                            {rsvp.transaction?.status || 'N/A'}
                                        </span>
                                    {/if}
                                </td>
                                <td class="p-2">{formatDate(rsvp.createdAt)}</td>
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