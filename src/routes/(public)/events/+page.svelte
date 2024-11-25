<script lang="ts">
    import {Button} from "$lib/components/ui/button";
    import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "$lib/components/ui/card";
    import type {PageData} from './$types';
    import {Separator} from "$lib/components/ui/separator";
    import {Calendar, MapPin} from "lucide-svelte";

    const {data}: { data: PageData } = $props();

    const {events} = data;

    function formatPrice(price: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'TZS'
        }).format(price);
    }

    function formatDate(date: Date): string {
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

</script>

<svelte:head>
    <title>Events - Toto Janjaz</title>
</svelte:head>

<section class="flex flex-col gap-3 container py-6 md:py-24">

    <h1 class="text-xl text-muted-foreground mb-6">Upcoming Events</h1>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {#each events as event }
            <Card>
                <CardHeader>
                    <CardTitle class="md:text-3xl">
                        {event.name}
                    </CardTitle>
                    <CardDescription>
                        {(event?.price || 0) > 0 ? formatPrice(event.price || 0) : "Free"}
                        <Separator orientation="vertical"/>
                        <div class="flex items-center gap-2">
                            <Calendar class="h-4 w-4"/>
                            <span>{formatDate(event.startDate)}</span>
                            {#if (event.endDate)}
                                <span> - </span>
                                <span>{formatDate(event.endDate)}</span>
                            {/if}
                        </div>
                        <div class="flex items-center gap-2">
                            <MapPin class="h-4 w-4"/>
                            <span>{event.location}</span>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
<!--                    <p>Learn about Tanzania's independence and its historical figures in an engaging quest!</p>-->
                </CardContent>
                <CardFooter>
                    <a href="/events/{event.id}" class="text-blue-600 hover:underline">
                       <Button>
                           View Event
                       </Button>
                    </a>
                </CardFooter>
            </Card>
        {/each}
    </div>


</section>