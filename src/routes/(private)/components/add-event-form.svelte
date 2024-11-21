<script lang="ts">
    import {gsap} from 'gsap';
    import {slide} from 'svelte/transition';
    import * as Form from "$lib/components/ui/form";
    import {Button} from "$lib/components/ui/button";
    import {Input} from "$lib/components/ui/input";
    import * as Select from "$lib/components/ui/select";
    import * as RadioGroup from "$lib/components/ui/radio-group";
    import {Checkbox} from "$lib/components/ui/checkbox";
    import {Textarea} from "$lib/components/ui/textarea";
    import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "$lib/components/ui/card";
    import SuperDebug, {
        fieldProxy,
        formFieldProxy,
        type Infer,
        superForm,
        type SuperValidated
    } from 'sveltekit-superforms';
    import {zod, zodClient} from "sveltekit-superforms/adapters";
    import {type AddEventSchema, addEventSchema} from "$lib/schema";
    import FormWrapper from "$lib/Form.svelte"
    import {Separator} from "$lib/components/ui/separator";
    import type {Session} from "@auth/sveltekit";
    import type {users} from "$lib/server/db/schema";
    import {CalendarIcon, Loader2} from "lucide-svelte";
    import type {DateRange} from "bits-ui";
    import {
        CalendarDate,
        DateFormatter,
        type DateValue,
        getLocalTimeZone, today
    } from "@internationalized/date";
    import {cn} from "$lib/utils.js";
    import {buttonVariants} from "$lib/components/ui/button";
    import {RangeCalendar} from "$lib/components/ui/range-calendar";
    import * as Popover from "$lib/components/ui/popover";
    import {Label} from "$lib/components/ui/label";
    import {onMount, onDestroy} from 'svelte';
    import TipTapEditor from './tip-tap-editor.svelte'
    import {toast} from "svelte-sonner";
    import {invalidateAll} from "$app/navigation";

    const df = new DateFormatter("en-US", {
        dateStyle: "medium"
    });

    let dateRangeValue: DateRange = $state({
        start: undefined,
        end: undefined
    });

    let {addEventForm, eventStates, session, user}: {
        addEventForm: SuperValidated<Infer<AddEventSchema>>,
        eventStates: string[],
        session: Session,
        user: typeof users.$inferSelect
    } = $props()

    const form = superForm(addEventForm, {
        validationMethod: 'auto',
        invalidateAll: 'force',
        dataType: 'json',
        taintedMessage: null,
        validators: zodClient(addEventSchema),
        onResult: async ({result, formElement}) => {

            if (result.type === "success") {
                toast.success(result.data?.form?.message || "success")
            }

        },
        onError: async ({result}) => {
            toast.error(result.error.message)
        }
    });

    const {form: formData, enhance, submitting} = form;
    const isSubmitting = $derived(submitting);
    // @ts-ignore
    const isValid = $derived($formData.valid);


    const {value: startDate} = formFieldProxy(form, 'startDate');
    const {value: endDate} = formFieldProxy(form, 'endDate');
    const {value: content} = formFieldProxy(form, 'description')


    onMount(() => {
        gsap.from('.form-field', {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out'
        });

    });

</script>

<Card class="w-full border-none mx-auto">

    <form
            action="?/register"
            method="POST"
            class="space-y-4"
            use:enhance
    >
        <div class="px-4 space-y-6">

            <!--    hidden parentId -->
            <Form.Field {form} name="createdBy">
                <Form.Control>
                    {#snippet children({props})}
                        <Input type="hidden" {...props} bind:value={$formData.createdBy}/>
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors/>
            </Form.Field>

            <Form.Field {form} name="name">
                <Form.Control>
                    {#snippet children({props})}
                        <Form.Label>Event Name</Form.Label>
                        <Input {...props} bind:value={$formData.name}/>
                    {/snippet}
                </Form.Control>
                <Form.Description>The name of your event.</Form.Description>
                <Form.FieldErrors/>
            </Form.Field>

            <Form.Field {form} name="location">
                <Form.Control>
                    {#snippet children({props})}
                        <Form.Label>Location</Form.Label>
                        <Input {...props} bind:value={$formData.location}/>
                    {/snippet}
                </Form.Control>
                <Form.Description>Where is the event taking place.</Form.Description>
                <Form.FieldErrors/>
            </Form.Field>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Field {form} name="maxParticipants">
                    <Form.Control>
                        {#snippet children({props})}
                            <Form.Label>Max number of participants</Form.Label>
                            <Input type="number" {...props} bind:value={$formData.maxParticipants}/>
                        {/snippet}
                    </Form.Control>
                    <Form.Description>Where is the event taking place.</Form.Description>
                    <Form.FieldErrors/>
                </Form.Field>

                <Form.Field {form} name="status">
                    <Form.Control>
                        {#snippet children({props})}
                            {@const options = eventStates}
                            <Form.Label>Status</Form.Label>
                            <Select.Root
                                    type="single"
                                    bind:value={$formData.status}
                                    name={props.name}
                            >
                                <Select.Trigger {...props}>
                                    {$formData.status ?? "Select a status"}
                                </Select.Trigger>
                                <Select.Content>
                                    {#each eventStates as option}
                                        <Select.Item value={option} label={option}/>
                                    {/each}
                                </Select.Content>
                            </Select.Root>
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors/>
                </Form.Field>
            </div>

            <div class="flex flex-col space-y-2">
                <Label>Date range</Label>
                <Popover.Root>
                    <Popover.Trigger
                            class={cn(
              buttonVariants({ variant: "outline" }),
              "w-[280px] justify-start pl-4 text-left font-normal",
              !$startDate && "text-muted-foreground"
            )}
                    >
                        <CalendarIcon class="size-4 opacity-50"/>
                        {#if $startDate}
                            {#if $endDate}
                                {df.format($startDate)} - {df.format(
                                $endDate
                            )}
                            {:else}
                                {df.format($startDate)}
                            {/if}
                        {:else}
                            Pick a date range
                        {/if}
                    </Popover.Trigger>
                    <Popover.Content class="w-auto p-0" side="top">
                        <RangeCalendar
                                minValue={today(getLocalTimeZone())}
                                calendarLabel="Pick time range for the event"
                                onStartValueChange={(v) => {
                                                if (v !== undefined) {
                                                    $startDate = v.toDate(getLocalTimeZone())
                                                }
                                            }}
                                onEndValueChange={(v) => {
                                                if (v !== undefined) {
                                                    $endDate = v.toDate(getLocalTimeZone())
                                                }
                                            }}
                                numberOfMonths={2}

                        />
                    </Popover.Content>
                </Popover.Root>
                <Label class="text-muted-foreground">When will the event start and end</Label>
            </div>

            <Form.Field {form} name="startDate">
                <Form.Control>
                    {#snippet children({props})}
                        <Input type="hidden" {...props} value={$startDate}/>
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors/>
            </Form.Field>

            <Form.Field {form} name="endDate">
                <Form.Control>
                    {#snippet children({props})}
                        <Input type="hidden" {...props} value={$endDate}/>
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors/>
            </Form.Field>

            <Form.Field {form} name="description">
                <Form.Control>
                    {#snippet children({props})}
                        <Form.Label>Event Description</Form.Label>
                        <TipTapEditor bind:content={$content}/>
                        <Input type="hidden" {...props} value={$content}/>
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors/>
            </Form.Field>

        </div>


        <Separator/>
        <div class="p-4">
            <Button
                    disabled={$isSubmitting}
                    type="submit" class="w-full">
                {#if $submitting}
                    <Loader2 class="mr-2 h-4 w-4 animate-spin"/>
                    Saving...
                {:else }
                    <span>Save event</span>
                {/if}
            </Button>
        </div>

    </form>

    <SuperDebug data={{formData: $formData, dateRangeValue}}></SuperDebug>

</Card>

<style lang="postcss">

    :global(body) {
        @apply bg-background text-foreground;
    }

    button.active {
        background: black;
        color: white;
    }

    .tiptap:first-child {
        margin-top: 0;
    }

</style>