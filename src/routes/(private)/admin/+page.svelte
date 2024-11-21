<script lang="ts">

    import {Card, CardContent} from "$lib/components/ui/card";
</script>

<svelte:head>
    <title>Admin - Toto Janjaz</title>
</svelte:head>

<div class="container space-y-4">

    <!--
    Stats and charts

    Starts:
    - Total users
    - Total children
    - Total events
    - Total bookings
    - Total revenue
    -->

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3 w-full">

        <Card class="bg-white gap-4 rounded-lg shadow-md p-5">
            <CardContent>
                <div class="font-black text-3xl">100</div>
                <div class="text-lg">Total revenue</div>
            </CardContent>
        </Card>

        <Card class="bg-white gap-4 rounded-lg shadow-md p-5">
            <CardContent>
                <div class="font-black text-3xl">100</div>
                <div class="text-lg">Total revenue</div>
            </CardContent>
        </Card>

        <Card class="bg-white gap-4 rounded-lg shadow-md p-5">
            <CardContent>
                <div class="font-black text-3xl">100</div>
                <div class="text-lg">Total revenue</div>
            </CardContent>
        </Card>

    </div>


</div>