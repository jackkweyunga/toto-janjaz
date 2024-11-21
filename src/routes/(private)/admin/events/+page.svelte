<script lang="ts">
    import type {PageData} from "./$types";
    import {Button} from "$lib/components/ui/button";
    import {Plus} from "lucide-svelte";
    import * as Avatar from "$lib/components/ui/avatar";

    let {data}: { data: PageData } = $props();
</script>

<div class="container space-y-4">

    <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold mt-8 mb-4">Events</h2>
        <a href={`/account/events/add`} class="">
            <Button variant="outline">
                <Plus/>
                Add
            </Button>
        </a>
    </div>

    <div class="grid grid-flow-col">
        {#each data.events as event}

            <div class="bg-white rounded-lg shadow-md p-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-4">
                        <Avatar.Root class="h-12 w-12 rounded-lg">
                            <Avatar.Image src={null} alt={event.name}/>
                            <Avatar.Fallback class="rounded-lg">{String(event.name[0]).toUpperCase()}</Avatar.Fallback>
                        </Avatar.Root>
                        <div>
                            <h3 class="text-lg font-semibold">{event.name}</h3>
                            <p class="text-sm text-gray-500">{event.location} years old</p>
                        </div>
                    </div>
                    <a href={`/admin/events/${event.id}`}>
                        <Button variant="outline">Edit</Button>
                    </a>
                </div>
            </div>

        {/each}
    </div>


</div>