<script lang="ts">
    import {type PageData} from './$types';
    import {Label} from "$lib/components/ui/label";
    import {Badge} from "$lib/components/ui/badge";

    let {data}: { data: PageData } = $props();

    const {
        users,
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
            <h3 class="text-lg font-semibold text-gray-700">Users</h3>
            <p class="text-3xl font-bold text-blue-600">{stats?.users.count || 0}</p>
        </div>
<!--        <div class="bg-white rounded-lg shadow p-6">-->
<!--            <h3 class="text-lg font-semibold text-gray-700">Collections</h3>-->
<!--            <p class="text-3xl font-bold text-green-600">{stats?.users.collections || 0}</p>-->
<!--        </div>-->
    </div>

    <!-- RSVPs List -->
    <div class="bg-white rounded-lg shadow mt-4">
        <div class="p-6">
            {#if users?.length > 0}
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                        <tr class="border-b">
                            <th class="text-left p-2">Email</th>
                            <th class="text-left p-2">Name</th>
                            <th class="text-left p-2">Role</th>
                            <th class="text-left p-2">Created</th>
                        </tr>
                        </thead>
                        <tbody>
                        {#each users as user}
                            <tr class="border-b hover:bg-gray-50">
                                <td class="p-2">
                                    {user?.email || 'N/A'}
                                </td>
                                <td class="p-2">{user?.name || 'N/A'}</td>
                                <td class="p-2">
                                    {#if user?.role === 'parent'}
                                        <Badge variant={'outline'} class="">parent</Badge>
                                    {/if}
                                    {#if user?.is_admin}
                                        <Badge class="">
                                            admin
                                        </Badge>
                                    {/if}
                                </td>
                                <td class="p-2">{formatDate(user.createdAt)}</td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            {:else}
                <div class="text-center py-8 text-gray-500">
                    No users found
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    /* Any additional custom styles can go here */
</style>