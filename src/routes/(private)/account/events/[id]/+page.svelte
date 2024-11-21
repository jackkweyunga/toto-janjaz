<script lang="ts">
    import { toast } from "svelte-sonner";
    import * as Tabs from "$lib/components/ui/tabs";
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge";
    import { Plus, ArrowLeft, ArrowRight } from "lucide-svelte";
    import { superForm } from "sveltekit-superforms/client";
    import type { PageData } from "./$types";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { type RsvpSchema, rsvpSchema } from "$lib/schema";
    import {writable} from "svelte/store";

    let { data }: { data: PageData } = $props();
    let currentStep = writable(1);

    const { form, errors, enhance, delayed, message } = superForm(data.rsvpForm!, {
        validationMethod: 'auto',
        invalidateAll: 'force',
        dataType: 'json',
        taintedMessage: null,
        validators: zodClient(rsvpSchema),
        onUpdate({ form }) {
            if (form.message) {
                if (!form.valid) {
                    toast.error(form.message);
                } else if (form.valid) {
                    toast.success(form.message);
                    if (parseInt(form.data?.payment_amount) > 0) {
                        toast.info('Please complete payment to confirm registration');
                    }
                }
            }
        }
    });

    function formatPrice(price: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price / 100);
    }

    function handleNext() {
        if ($form.childrenIds.length === 0) {
            toast.error('Please select at least one child');
            return;
        }
        $currentStep = 2;
    }

    function handleBack() {
        $currentStep = 1;
    }

    function handleChildToggle(childId: string) {
        if ($form.childrenIds.includes(childId)) {
            $form.childrenIds = $form.childrenIds.filter(id => id !== childId);
        } else {
            $form.childrenIds = [...$form.childrenIds, childId];
        }
    }
</script>

<Card.Root class="mx-auto max-w-2xl border-none mb-12">
    <Card.Header class="flex justify-between gap-4 items-start">
        <Card.Title class="text-4xl">{data.event?.name}</Card.Title>
        <div class="flex flex-wrap gap-2">
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

    <!-- Step Indicator -->
    <div class="my-8">
        <div class="flex justify-center items-center gap-4">
            <div class="flex items-center {$currentStep === 1 ? 'text-primary' : 'text-muted-foreground'}">
                <div class="w-8 h-8 rounded-full flex items-center justify-center border-2
                    {$currentStep === 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}">
                    1
                </div>
                <span class="ml-2">Children</span>
            </div>
            <div class="w-16 h-px bg-muted"></div>
            <div class="flex items-center {$currentStep === 2 ? 'text-primary' : 'text-muted-foreground'}">
                <div class="w-8 h-8 rounded-full flex items-center justify-center border-2
                    {$currentStep === 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}">
                    2
                </div>
                <span class="ml-2">Payment</span>
            </div>
        </div>
    </div>

    <form
            method="POST"
            action="?/register"
            class="space-y-4"
            use:enhance
    >
        {#if data.event}
            <input type="hidden" name="eventId" bind:value={$form.eventId}/>
        {/if}

        {#if $currentStep === 1}
            <Card.Content class="space-y-6 border rounded">
                <div>
                    <h2 class="text-2xl font-semibold">Add the kid you want to RSVP</h2>
                    <p class="font-thin">You can select more than one.</p>
                </div>

                {#if data.children}
                    {#each data.children as child}
                        <div class="flex items-center justify-start space-x-2 border w-full px-3 py-4">
                            <Checkbox
                                    id={`child-${child.id}`}
                                    checked={$form.childrenIds.includes(child.id)}
                                    onCheckedChange={() => handleChildToggle(child.id)}
                            />
                            <Label class="text-foreground" for={`child-${child.id}`}>
                                {child.fullName} ({child.age} years old)
                            </Label>
                        </div>
                    {/each}
                {/if}

                {#if $errors.childrenIds}
                    <p class="text-destructive text-sm">
                        {$errors.childrenIds._errors?.map(error => error).join(', ')}
                    </p>
                {/if}

                <Button
                        type="button"
                        variant="outline"
                        class="w-full"
                >
                    <Plus class="mr-2" />
                    Add child
                </Button>

                <div class="flex items-start space-x-2">
                    <Checkbox
                            id="participation_permission"
                            name="participation_permission"
                            bind:checked={$form.participation_permission}
                    />
                    <Label>
                        I, the undersigned, give permission for my child to participate in the Nyerere Day Quest. *
                    </Label>
                </div>
                {#if $errors.participation_permission}
                    <p class="text-destructive text-sm">{$errors.participation_permission}</p>
                {/if}

                <div class="flex items-start space-x-2">
                    <Checkbox
                            id="media_permission"
                            name="media_permission"
                            bind:checked={$form.media_permission}
                    />
                    <Label class="leading-6">
                        I, the undersigned, give permission for my child's photos/videos to be taken and used
                        for promotional purposes only. (optional)
                    </Label>
                </div>
                {#if $errors.media_permission}
                    <p class="text-destructive text-sm">{$errors.media_permission}</p>
                {/if}

                <div class="flex justify-end pt-4">
                    <Button
                            type="button"
                            onclick={handleNext}
                            disabled={$form.childrenIds.length === 0 || !$form.participation_permission || !$form.media_permission }
                    >
                        Next Step
                        <ArrowRight class="ml-2" />
                    </Button>
                </div>
            </Card.Content>
        {:else}
            <div class="space-y-4">
                <Card.Content class="border rounded">
                    <div class="w-full flex flex-col space-y-4">
                        <div class="text-2xl font-semibold">Payment</div>
                        <div class="flex flex-col gap-2">
                            <Label class="text-muted-foreground">Amount</Label>
                            <div class="text-xl">
                                <span>{$form.payment_currency}</span>
                                <span>{$form.payment_amount || 0}</span>
                            </div>
                        </div>

                        <Label class="text-muted-foreground">Select a payment method</Label>

                        <Tabs.Root value="mobile" class="w-full">
                            <Tabs.List class="grid w-full grid-cols-2">
                                <Tabs.Trigger value="mobile">Mobile</Tabs.Trigger>
                                <Tabs.Trigger value="bank">Bank</Tabs.Trigger>
                            </Tabs.List>
                            <Tabs.Content value="mobile">
                                <Card.Root>
                                    <Card.Header>
                                        <Card.Description>
                                            <p class="font-thin">Pay instantly with mobile</p>
                                            <p>Enter a phone number used for payment</p>
                                        </Card.Description>
                                    </Card.Header>
                                    <Card.Content class="space-y-2">
                                        <div class=" flex flex-col gap-2">
                                            <Input
                                                    name="phone"
                                                    bind:value={$form.phone}
                                                    placeholder="0765142714"
                                            />
                                            {#if $errors.phone}
                                                <p class="text-destructive text-sm">{$errors.phone}</p>
                                            {/if}
                                        </div>
                                    </Card.Content>
                                </Card.Root>
                            </Tabs.Content>
                            <Tabs.Content value="bank">
                                <Card.Root>
                                    <Card.Header>
                                        <Card.Description>
                                            <p class="font-thin">Pay to our bank account</p>
                                            <p>Requires you to submit verification</p>
                                        </Card.Description>
                                    </Card.Header>
                                    <Card.Content class="space-y-2">
                                        <div class=" flex flex-col gap-2">
                                            <div class="flex gap-4 border p-2 rounded  items-center justify-between">
                                                <Label>0152305248900</Label>
                                                <Button
                                                    onclick={() => {
                                                        navigator.clipboard.writeText('0152305248900');
                                                        toast.success('Copied to clipboard');
                                                    }}
                                                >
                                                    copy
                                                </Button>
                                            </div>
                                            <p class="font-bold text-xl">CRDB BANK - Amina Lukanza</p>
                                        </div>
                                    </Card.Content>
                                </Card.Root>
                            </Tabs.Content>
                        </Tabs.Root>
                    </div>
                </Card.Content>

                <div class="flex justify-between pt-4">
                    <Button
                            type="button"
                            variant="outline"
                            onclick={handleBack}
                    >
                        <ArrowLeft class="mr-2" />
                        Back
                    </Button>
                    <Button
                            type="submit"
                            disabled={$delayed}
                    >
                        {$delayed ? 'Submitting...' : 'RSVP'}
                    </Button>
                </div>
            </div>
        {/if}
    </form>
</Card.Root>