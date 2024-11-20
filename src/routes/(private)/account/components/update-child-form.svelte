<script lang="ts">
    import {onMount} from 'svelte';
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
    import SuperDebug, {type Infer, superForm, type SuperValidated} from 'sveltekit-superforms';
    import {zod, zodClient} from "sveltekit-superforms/adapters";
    import {type AddChildSchema, addChildSchema, MIN_AGE, MAX_AGE} from "$lib/schema";
    import FormWrapper from "$lib/Form.svelte"
    import {Separator} from "$lib/components/ui/separator";
    import type {Session} from "@auth/sveltekit";
    import type {users} from "$lib/server/db/schema";

    let {addChildForm, dietaryOptions, session, user}: {
        addChildForm: SuperValidated<Infer<AddChildSchema>>,
        dietaryOptions: string[],
        session: Session,
        user: typeof users.$inferSelect
    } = $props()

    const form = superForm(addChildForm, {
        validators: zodClient(addChildSchema),
    });

    const {form: formData, enhance} = form;

    const showMedicalConditions = $derived($formData.allergies === 'yes');

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

<Card class="w-full max-w-2xl border-none mx-auto">

    <form
            action="?/update"
            method="POST"
            class="space-y-4"
            use:enhance
    >
        <div class="px-4 space-y-6">

            <!--    hidden parentId -->
            <Form.Field {form} name="parentId">
                <Form.Control>
                    {#snippet children({props})}
                        <Input type="hidden" {...props} bind:value={$formData.parentId}/>
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors/>
            </Form.Field>

            <Form.Field {form} name="fullName">
                <Form.Control>
                    {#snippet children({props})}
                        <Form.Label>Full Name</Form.Label>
                        <Input {...props} bind:value={$formData.fullName}/>
                    {/snippet}
                </Form.Control>
                <Form.Description>This will be kept private.</Form.Description>
                <Form.FieldErrors/>
            </Form.Field>

            <Form.Field {form} name="nickname">
                <Form.Control>
                    {#snippet children({props})}
                        <Form.Label>Nickname</Form.Label>
                        <Input {...props} bind:value={$formData.nickname}/>
                    {/snippet}
                </Form.Control>
                <Form.Description>Used publicly instead of real name.</Form.Description>
                <Form.FieldErrors/>
            </Form.Field>

            <Form.Field {form} name="relationship">
                <Form.Control>
                    {#snippet children({props})}
                        {@const options = ['parent', 'guardian', 'sibling']}
                        <Form.Label>Relationship</Form.Label>
                        <Select.Root
                                type="single"
                                bind:value={$formData.relationship}
                                name={props.name}
                        >
                            <Select.Trigger {...props}>
                                {$formData.relationship ?? "Select a relationship"}
                            </Select.Trigger>
                            <Select.Content>
                                {#each ['parent', 'guardian', 'sibling'] as option}
                                    <Select.Item value={option} label={option}/>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors/>
            </Form.Field>

            <div class="grid grid-cols-2 gap-4">
                <Form.Field {form} name="age">
                    <Form.Control>
                        {#snippet children({props})}
                            <Form.Label>Age</Form.Label>
                            <Input min={MIN_AGE} max={MAX_AGE} type="number" {...props} bind:value={$formData.age}/>
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors/>
                </Form.Field>

                <Form.Field {form} name="gender">
                    <Form.Control>
                        {#snippet children({props})}
                            {@const options = ['male', 'female', 'other']}
                            <Form.Label>Gender</Form.Label>
                            <Select.Root
                                    type="single"
                                    bind:value={$formData.gender}
                                    name={props.name}
                            >
                                <Select.Trigger {...props}>
                                    {$formData.gender ?? "Select a gender"}
                                </Select.Trigger>
                                <Select.Content>
                                    {#each options as option}
                                        <Select.Item value={option} label={option}/>
                                    {/each}
                                </Select.Content>
                            </Select.Root>
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors/>
                </Form.Field>
            </div>

            <Form.Fieldset {form} name="allergies">
                <Form.Legend>Has Allergies?</Form.Legend>
                <RadioGroup.Root
                        bind:value={$formData.allergies}
                        class="flex flex-wrap items-center gap-2"
                        name="allergies"
                >
                    <Form.Control>
                        {#snippet children({props})}
                            <RadioGroup.Item value="no" {...props}/>
                            <Form.Label class="font-normal">No</Form.Label>
                        {/snippet}
                    </Form.Control>

                    <Form.Control>
                        {#snippet children({props})}
                            <RadioGroup.Item value="yes" {...props}/>
                            <Form.Label class="font-normal">Yes</Form.Label>
                        {/snippet}
                    </Form.Control>

                </RadioGroup.Root>

                <Form.FieldErrors/>
            </Form.Fieldset>

            {#if showMedicalConditions}
                <div transition:slide>
                    <Form.Field {form} name="medicalConditions">
                        <Form.Control>
                            {#snippet children({props})}
                                <Form.Label>Medical Conditions</Form.Label>
                                <Textarea {...props} bind:value={$formData.medicalConditions}/>
                            {/snippet}
                        </Form.Control>
                        <Form.Description>Describe any conditions in detail.</Form.Description>
                        <Form.FieldErrors/>
                    </Form.Field>
                </div>

            {/if}

            <Form.Field {form} name="dietaryRestrictions">
                <Form.Control>
                    {#snippet children({props})}
                        <Form.Label>Dietary Restrictions</Form.Label>
                        <div class="grid grid-cols-2 gap-2">
                            {#each dietaryOptions as option}
                                <label class="flex items-center gap-2">
                                    <Checkbox
                                            {...props}
                                            checked={$formData.dietaryRestrictions.includes(option)}
                                            onCheckedChange={(v) => {
                                 if (v) {
                                   $formData.dietaryRestrictions = [...$formData.dietaryRestrictions, option];
                                 } else {
                                   $formData.dietaryRestrictions = $formData.dietaryRestrictions.filter(
                                     (item) => item !== option
                                   );
                                 }
                               }}
                                            {...props}
                                    />
                                    {option}
                                </label>
                            {/each}
                        </div>
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors/>
            </Form.Field>

            <Form.Field {form} name="medications">
                <Form.Control>
                    {#snippet children({props})}
                        <Form.Label>Medications</Form.Label>
                        <Textarea {...props} bind:value={$formData.medications}/>
                    {/snippet}
                </Form.Control>
                <Form.Description>List any required medications.</Form.Description>
                <Form.FieldErrors/>
            </Form.Field>

            <Form.Field {form} name="emergencyContact">
                <Form.Control>
                    {#snippet children({props})}
                        <Form.Label>Emergency Contact</Form.Label>
                        <Input {...props} bind:value={$formData.emergencyContact}/>
                    {/snippet}
                </Form.Control>
                <Form.Description>Always reachable number.</Form.Description>
                <Form.FieldErrors/>
            </Form.Field>

        </div>
        <Separator/>
        <div class="p-4">
            <Button type="submit" class="w-full">Save Child</Button>
        </div>

    </form>

    <SuperDebug data={$formData}></SuperDebug>

</Card>

<style lang="postcss">
    :global(body) {
        @apply bg-background text-foreground;
    }
</style>