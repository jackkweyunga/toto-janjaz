<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import type {PageData} from './$types';

    const {data}: { data: PageData } = $props();

    const {event} = data;

</script>


<svelte:head>
    <title>{event?.name} - Toto Janjaz</title>
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-3xl">
    <section class="space-y-12">
        <div class="text-center">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-[#8657b3] max-w-4xl mx-auto leading-tight">
                {event?.name}
            </h1>
        </div>

        <div class="prose prose-lg">
            {@html event?.description}
        </div>

        <div class="text-center">
            <a href="/account/events/{event?.id}" >
                <Button size="lg">
                    RSVP Now
                </Button>
            </a>
        </div>

    </section>
</div>

<style>
    :global(.prose) {
        max-width: none;
    }
</style>