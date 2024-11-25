<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import type {PageData} from './$types';

    const {data}: { data: PageData } = $props();

    const {event} = data;

</script>

<div class="container mx-auto px-4 py-12 max-w-6xl">
    <section class="space-y-12">
        <div class="text-center">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-[#8657b3] max-w-4xl mx-auto leading-tight">
                {event.name}
            </h1>
        </div>

        <div class="prose prose-lg max-w-none">
            {@html event?.description}
        </div>

        <div class="text-center">
            <Button class="bg-[#8657b3] text-white hover:bg-[#6f4696] px-8 py-2 rounded-md text-lg">
                RSVP Now
            </Button>
        </div>

    </section>
</div>

<style>
    :global(.prose) {
        max-width: none;
    }
</style>