<script lang="ts">
    import {toast} from "svelte-sonner";
    import {Checkbox} from "$lib/components/ui/checkbox/index.js";
    import {Button} from "$lib/components/ui/button/index.js";
    import {Label} from "$lib/components/ui/label/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import {type PageData} from "./$types"
    import {Badge} from "$lib/components/ui/badge";
    import {Separator} from "$lib/components/ui/separator";
    import {enhance} from '$app/forms';
    import {writable} from "svelte/store";
    import type {ActionData} from ".//$types";

    export let data: PageData;
    export let form: ActionData;

    let selectedChildren = writable<Record<string, boolean>>({});

    function formatPrice(price: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price / 100);
    }

    const isSubmitting = writable(false)

</script>

<Card.Root class="mx-auto max-w-2xl">

    <Card.Header class="flex justify-between gap-4 items-start">
        <Card.Title class="text-4xl">{data.event?.name}</Card.Title>
        <div class="flex gap-2">
            {#if data.event?.spotsAvailable === 0}
                <Badge variant="secondary">Full</Badge>
            {:else}
                <Badge variant="secondary">
                    {data.event?.spotsAvailable} spots left
                </Badge>
            {/if}
            {#if data.event?.price}
                <Badge variant="outline">{formatPrice(data.event?.price)}</Badge>
            {/if}
        </div>
    </Card.Header>

    <Card.Content>
        <p>
            Choose which children you'd like to register for {data.event?.name}
        </p>
        {#if data.event?.price}
            <div class="mt-2">
                Price per child: {formatPrice(data.event.price)}
            </div>
        {/if}
    </Card.Content>

    <form
            method="POST"
            action="?/register"
            class="space-y-4"
            use:enhance={() => {
        $isSubmitting = true;
        return async ({ result }) => {
          $isSubmitting = false;
          if (result.type === 'success') {
            toast.success('Registration successful');
            if (result.data?.requiresPayment) {
              // Here you would handle payment flow
              toast.info('Please complete payment to confirm registration');
            }
          } else if (result.type === 'failure') {
            toast.error(result.data?.message?.toString() || 'Registration failed');
          }
        };
      }}
    >
        {#if data.event}
            <input type="hidden" name="eventId" value={data.event?.id}/>
        {/if}

        {#if (data.children !== undefined)}
        <div class="space-y-4 py-4">
            {#each data.children as child}
                <div class="flex items-center space-x-2">
                    <Checkbox
                            id={`child-${child.id}`}
                            name="childrenIds[]"
                            value={child.id}
                            checked={$selectedChildren[child.id] || false}
                            onCheckedChange={(checked) => {
                                $selectedChildren[child.id] = checked;
                                selectedChildren = selectedChildren;
                              }}
                    />
                    <Label for={`child-${child.id}`}>
                        {child.fullName} ({child.age} years old)
                    </Label>
                </div>
            {/each}
        </div>
            {/if}

    </form>

</Card.Root>

