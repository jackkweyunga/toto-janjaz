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
    import {type UpdateUserSchema, updateUserSchema} from "$lib/schema";
    import FormWrapper from "$lib/Form.svelte"
    import {Separator} from "$lib/components/ui/separator";
    import type {Session} from "@auth/sveltekit";
    import type {users} from "$lib/server/db/schema";
    import {Label} from "$lib/components/ui/label";
    import {Avatar} from "$lib/components/ui/avatar";
    import {AvatarFallback, AvatarImage} from "$lib/components/ui/avatar";
    import {Switch} from "$lib/components/ui/switch";

    let {updateProfileForm, session, user}: {
        updateProfileForm: SuperValidated<Infer<UpdateUserSchema>>,
        session: Session,
        user: typeof users.$inferSelect
    } = $props()

    const form = superForm(updateProfileForm, {
        validators: zodClient(updateUserSchema),
    });

    const {form: formData, enhance} = form;

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

            <Avatar class="h-24 w-24">
                <AvatarImage src={user?.image}/>
                <AvatarFallback>
                    {user?.name ? user?.name[0] : ""}
                </AvatarFallback>
            </Avatar>

            <div>
                <Label>Full Name</Label>
                <p>{user?.name}</p>
            </div>

            <div>
                <Label>Email</Label>
                <p>{user?.email}</p>
            </div>

            <!--    hidden userId -->
            <Form.Field {form} name="userId">
                <Form.Control>
                    {#snippet children({props})}
                        <Input type="hidden" {...props} bind:value={$formData.userId}/>
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors/>
            </Form.Field>

            <Form.Field {form} name="phone">
                <Form.Control>
                    {#snippet children({props})}
                        <Form.Label>Phone number</Form.Label>
                        <Input {...props} bind:value={$formData.phone}/>
                    {/snippet}
                </Form.Control>
                <Form.Description></Form.Description>
                <Form.FieldErrors/>
            </Form.Field>

            <Form.Field {form} name="is_admin" class="flex flex-row items-center justify-between rounded-lg border p-4">
                <Form.Control>
                    {#snippet children({props})}
                        <div class="space-y-0.5">
                            <Form.Label>Is Admin user ?</Form.Label>
                            <Form.Description>
                                Enable admin capabilities for this user
                            </Form.Description>
                            <Form.FieldErrors/>
                        </div>
                        <Switch
                                {...props}
                                bind:checked={$formData.is_admin}
                        />
                    {/snippet}
                </Form.Control>
            </Form.Field>

            <Form.Field {form} name="role">
                <Form.Control>
                    {#snippet children({props})}
                        {@const options = ['parent']}
                        <Form.Label>Role</Form.Label>
                        <Select.Root
                                type="single"
                                bind:value={$formData.role}
                                name={props.name}
                        >
                            <Select.Trigger {...props}>
                                {$formData.role ?? "Select a relationship"}
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

        </div>
        <Separator/>
        <div class="p-4">
            <Button type="submit" class="w-full">Save Changes</Button>
        </div>

    </form>

<!--    <SuperDebug data={$formData}></SuperDebug>-->

</Card>

<style lang="postcss">
    :global(body) {
        @apply bg-background text-foreground;
    }
</style>