<script lang="ts">
    import {Button} from "$lib/components/ui/button";
    import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "$lib/components/ui/card";
    import type {PageData} from './$types';

    const {data}: { data: PageData } = $props();

    const {events} = data;

</script>

<svelte:head>
    <title>Events - Toto Janjaz</title>
</svelte:head>

<section class="flex flex-col gap-3 container py-6 md:py-24">

    <h1 class="text-3xl font-bold mb-6">Upcoming Events</h1>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {#each events as event }
            <Card>
                <CardHeader>
                    <CardTitle>
                        {event.name}
                    </CardTitle>
<!--                    <CardDescription>Independence Day Special</CardDescription>-->
                </CardHeader>
                <CardContent>
<!--                    <p>Learn about Tanzania's independence and its historical figures in an engaging quest!</p>-->
                </CardContent>
                <CardFooter>
                    <a href="/events/{event.id}" class="text-blue-600 hover:underline">
                        View Event
                    </a>
                </CardFooter>
            </Card>
        {/each}
    </div>


</section>