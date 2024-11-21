<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import { Phone, Mail, MessageSquare } from "lucide-svelte";
    import { fade } from "svelte/transition";

    const contactMethods = [
        {
            title: "Normal Call",
            value: "+255 692370870",
            icon: Phone,
            action: "Call Now",
            href: "tel:+255692370870"
        },
        {
            title: "WhatsApp Number",
            value: "+255 692370870",
            icon: MessageSquare,
            action: "Text Us",
            href: "https://wa.me/255692370870"
        },
        {
            title: "Our email",
            value: "totojanjaz@gmail.com",
            icon: Mail,
            action: "Email Us",
            href: "mailto:totojanjaz@gmail.com"
        }
    ];
</script>

<div class="container mx-auto px-4 py-12 max-w-4xl" in:fade>
    <h1 class="text-3xl md:text-4xl font-bold mb-4">
        Please don't hesitate to Reach us!
    </h1>

    <Card.Root class="mt-8">
        <Card.Header>
<!--            <Card.Title class="text-2xl md:text-3xl">Nyerere Quest Event</Card.Title>-->
            <Card.Description class="text-lg text-muted-foreground">
                If something is not right, Don't hesitate to reach us!
            </Card.Description>
        </Card.Header>

        <Card.Content class="space-y-8">
            {#each contactMethods as method}
                <div class="group relative border rounded-lg p-6 transition-all hover:border-primary">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div class="space-y-2">
                            <div class="flex items-center gap-2 text-lg text-muted-foreground">
                                <svelte:component this={method.icon} class="w-5 h-5" />
                                {method.title}
                            </div>
                            <p class="text-xl md:text-2xl font-medium">{method.value}</p>
                        </div>
                        <Button>
                            <a
                                    href={method.href}
                                    class="no-underline"
                                    target={method.title === "Our email" ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                            >
                                {method.action}
                            </a>
                        </Button>
                    </div>

                    <!-- Gradient border animation on hover -->
                    <div class="absolute inset-0 -z-10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <div class="absolute inset-[-1px] rounded-lg bg-gradient-to-r from-primary/50 to-primary/20 blur-sm"></div>
                    </div>
                </div>
            {/each}
        </Card.Content>
    </Card.Root>
</div>

<style>
    /* Optional: Add custom styles here if needed */
</style>