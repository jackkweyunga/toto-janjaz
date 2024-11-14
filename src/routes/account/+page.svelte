<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import {Label} from "$lib/components/ui/label";
    import {Input} from "$lib/components/ui/input";
</script>

<svelte:head>

    <title>Account - Toto Janjaz</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-6">Account</h1>

<form class="space-y-4 max-w-md">
    <div>
        <Label for="name">Name</Label>
        <Input id="name" placeholder="Your name" />
    </div>
    <div>
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="Your email" />
    </div>
    <div>
        <Label for="phone">Phone</Label>
        <Input id="phone" type="tel" placeholder="Your phone number" />
    </div>
    <Button type="submit">Update Details</Button>
</form>

<h2 class="text-2xl font-bold mt-8 mb-4">Children</h2>

<div class="space-y-4">
    <div class="p-4 bg-muted rounded-lg">
        <p class="font-semibold">Novatus Mushi</p>
    </div>
    <Button variant="outline">Add Child</Button>
</div>