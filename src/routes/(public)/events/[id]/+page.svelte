<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import type {PageData} from './$types';
    import {onMount} from 'svelte';
    import {invalidateAll} from "$app/navigation";

    const {data}: { data: PageData } = $props();

    const {event} = data;

    onMount(() => {
        invalidateAll();
    });

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

        <article class="flex flex-col prose prose-lg">
            {@html event?.description}
        </article>

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

     :global([data-youtube-video]) {
         position: relative;
         width: 100%;
         padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
         overflow: hidden;
     }

    :global([data-youtube-video] iframe) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

</style>