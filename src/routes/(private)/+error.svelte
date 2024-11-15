<script>
    import { page } from '$app/stores';
    import { Button } from "$lib/components/ui/button";
    import { ArrowLeft } from "lucide-svelte";
</script>

<div class="min-h-screen bg-gradient-to-b from-primary/20 to-background flex flex-col items-center justify-center p-4 text-center">
    <div class="max-w-md">
        <h1 class="text-6xl font-bold text-primary mb-4">Oops!</h1>
        <h2 class="text-3xl font-semibold mb-4">
            {$page.status}: {$page.error?.message}
        </h2>
        <p class="text-xl mb-8">
            Looks like you've wandered off the map! Don't worry, even the best explorers get lost sometimes.
        </p>
        <div class="mb-8">
            <svg class="w-48 h-48 mx-auto text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 15s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
        </div>
        <p class="text-lg mb-8">
            Let's get you back on track to continue your TotoJanjaz adventure!
        </p>
        <Button href="/" class="inline-flex items-center">
            <ArrowLeft class="mr-2 h-4 w-4" />
            Return to Home
        </Button>
    </div>
</div>

<style>
    :global(body) {
        @apply bg-background text-foreground;
    }
</style>