<!-- src/routes/events/+page.svelte -->
<script lang="ts">
    import { enhance } from '$app/forms';
    import { Calendar, Clock, MapPin, Users } from 'lucide-svelte';
    import * as Dialog from '$lib/components/ui/dialog';
    import * as Card from '$lib/components/ui/card';
    import { Button } from '$lib/components/ui/button';
    import { Badge } from '$lib/components/ui/badge';
    import { Checkbox } from '$lib/components/ui/checkbox';
    import { Label } from '$lib/components/ui/label';
    import { toast } from 'svelte-sonner';
    import type { PageData, ActionData } from './$types';

    export let data: PageData;
    export let form: ActionData;

    let dialogOpen = false;
    let currentEvent: (typeof data.events)[0] | null = null;
    let selectedChildren: Record<string, boolean> = {};
    let isSubmitting = false;

    $: events = data.events;
    $: children = data.children;

    function formatDate(date: Date): string {
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

    function formatTime(dateString: string): string {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });
    }

    function formatPrice(price: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price / 100);
    }

    function openDialog(event: typeof currentEvent) {
        currentEvent = event;
        selectedChildren = {};
        dialogOpen = true;
    }
</script>

<div class="max-w-6xl mx-auto p-6">
    <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Available Events</h1>
        <p class="text-gray-600">Select events for your children to participate in</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
        {#each events as event}
            <Card.Root>
                <Card.Header>
                    <div class="flex justify-between items-start">
                        <Card.Title>{event.name}</Card.Title>
                        <div class="flex gap-2">
                            {#if event.spotsAvailable === 0}
                                <Badge variant="secondary">Full</Badge>
                            {:else}
                                <Badge variant="secondary">
                                    {event.spotsAvailable} spots left
                                </Badge>
                            {/if}
                            {#if event.price}
                                <Badge variant="outline">{formatPrice(event.price)}</Badge>
                            {/if}
                        </div>
                    </div>
                    <Card.Description>{event.description}</Card.Description>
                </Card.Header>

                <Card.Content>
                    <div class="space-y-2">
                        <div class="flex items-center gap-2">
                            <Calendar class="h-4 w-4" />
                            <span>{formatDate(event.startDate)}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <Clock class="h-4 w-4" />
                            <span>{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <MapPin class="h-4 w-4" />
                            <span>{event.location}</span>
                        </div>

                        {#if event.userRegistrations?.length > 0}
                            <div class="mt-4 p-4 bg-muted rounded-lg">
                                <h4 class="font-semibold mb-2">Your Registrations</h4>
                                {#each event.userRegistrations as registration}
                                    <div class="flex justify-between items-center mb-2">
                                        <span>{registration.child.fullName}</span>
                                        <div class="flex gap-2 items-center">
                                            <Badge variant={registration.status === 'confirmed' ? 'default' : 'secondary'}>
                                                {registration.status}
                                            </Badge>
                                            {#if registration.transaction}
                                                <Badge variant="outline">
                                                    {registration.transaction.status}
                                                </Badge>
                                            {/if}
                                            <form
                                                    method="POST"
                                                    action="?/cancelRegistration"
                                                    use:enhance={() => {
                          isSubmitting = true;
                          return async ({ result }) => {
                            isSubmitting = false;
                            if (result.type === 'success') {
                              toast.success('Registration cancelled');
                            } else if (result.type === 'failure') {
                              toast.error(result.data?.message || 'Failed to cancel registration');
                            }
                          };
                        }}
                                            >
                                                <input type="hidden" name="rsvpId" value={registration.id} />
                                                <Button variant="destructive" size="sm" type="submit" disabled={isSubmitting}>
                                                    Cancel
                                                </Button>
                                            </form>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </div>
                </Card.Content>

                <Card.Footer class="flex justify-end">
                    <Button
                            on:click={() => openDialog(event)}
                            disabled={event.spotsAvailable === 0}
                    >
                        {event.spotsAvailable === 0 ? 'Fully Booked' : 'Register Children'}
                    </Button>
                </Card.Footer>
            </Card.Root>
        {/each}
    </div>
</div>

<Dialog.Root bind:open={dialogOpen}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Select Children to Register</Dialog.Title>
            <Dialog.Description>
                {#if currentEvent}
                    Choose which children you'd like to register for {currentEvent.name}
                    {#if currentEvent.price}
                        <div class="mt-2">
                            Price per child: {formatPrice(currentEvent.price)}
                        </div>
                    {/if}
                {/if}
            </Dialog.Description>
        </Dialog.Header>

        <form
                method="POST"
                action="?/register"
                class="space-y-4"
                use:enhance={() => {
        isSubmitting = true;
        return async ({ result }) => {
          isSubmitting = false;
          if (result.type === 'success') {
            dialogOpen = false;
            toast.success('Registration successful');
            if (result.data.requiresPayment) {
              // Here you would handle payment flow
              toast.info('Please complete payment to confirm registration');
            }
          } else if (result.type === 'failure') {
            toast.error(result.data?.message || 'Registration failed');
          }
        };
      }}
        >
            {#if currentEvent}
                <input type="hidden" name="eventId" value={currentEvent.id} />
            {/if}

            <div class="space-y-4 py-4">
                {#each children as child}
                    <div class="flex items-center space-x-2">
                        <Checkbox
                                id={`child-${child.id}`}
                                name="childrenIds[]"
                                value={child.id}
                                checked={selectedChildren[child.id] || false}
                                onCheckedChange={(checked) => {
                selectedChildren[child.id] = checked;
                selectedChildren = selectedChildren;
              }}
                        />
                        <Label for={`child-${child.id}`}>
                            {child.fullName} ({child.age} years old)
                        </Label>
                    </div>
                {/each}
            </div>

            {#if form?.message}
                <p class="text-destructive text-sm">{form.message}</p>
            {/if}

            <Dialog.Footer>
                <Button
                        type="submit"
                        disabled={isSubmitting || !Object.values(selectedChildren).some(Boolean)}
                >
                    {isSubmitting ? 'Registering...' : 'Confirm Registration'}
                </Button>
            </Dialog.Footer>
        </form>
    </Dialog.Content>
</Dialog.Root>