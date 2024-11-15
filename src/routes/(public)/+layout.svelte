<!-- src/routes/(public)/+layout.svelte -->
<script lang="ts">
    import {ScrollArea} from "$lib/components/ui/scroll-area";
    import Header from "$lib/components/header.svelte";
    import Footer from "$lib/components/footer.svelte";
    let { children } = $props();
</script>

<ScrollArea class="h-screen">
    <Header />

    {@render children()}

    <Footer/>
</ScrollArea>
