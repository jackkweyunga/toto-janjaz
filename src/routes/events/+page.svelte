<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
</script>

<svelte:head>
    <title>Events - Toto Janjaz</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-6">Upcoming Events</h1>

<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <Card>
        <CardHeader>
            <CardTitle>Nyerere Quest</CardTitle>
            <CardDescription>Independence Day Special</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Learn about Tanzania's independence and its historical figures in an engaging quest!</p>
        </CardContent>
        <CardFooter>
            <Button>RSVP</Button>
        </CardFooter>
    </Card>

    <!-- Add more event cards as needed -->
</div>