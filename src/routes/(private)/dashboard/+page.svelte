<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import {Label} from "$lib/components/ui/label";
    import {Input} from "$lib/components/ui/input";
</script>

<svelte:head>
    <title>Account - Toto Janjaz</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-6">Dashboard</h1>

<h2 class="text-2xl font-bold mt-8 mb-4">Children</h2>

<div class="space-y-4">
    <div class="p-4 bg-muted rounded-lg">
        <p class="font-semibold">Novatus Mushi</p>
    </div>
    <Button variant="outline">Add Child</Button>
</div>