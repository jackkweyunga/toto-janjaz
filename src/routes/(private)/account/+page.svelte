<script lang="ts">
    import {page} from "\$app/stores";
    import {Separator} from "$lib/components/ui/separator";
    import {Plus} from "lucide-svelte";
    import {
        Button,
        buttonVariants
    } from "$lib/components/ui/button";
    import type {PageData} from './$types';
    import * as Dialog from "$lib/components/ui/dialog";
    import {Input} from "$lib/components/ui/input";
    import {Label} from "$lib/components/ui/label";
    import AddChildForm from "./components/add-child-form.svelte"
    import {ScrollArea} from "$lib/components/ui/scroll-area";
    import * as Avatar from "$lib/components/ui/avatar";

    let {data}: { data: PageData } = $props();

</script>

<svelte:head>
    <title>Account - Toto Janjaz</title>
</svelte:head>

<div class="flex flex-col container">

    <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold mt-8 mb-4">Children</h2>

        <div class="space-y-4">
            <Dialog.Root>
                <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
                    <Plus/>
                    Add Child
                </Dialog.Trigger>
                <Dialog.Content class="sm:max-w-[512px] h-[90vh] px-0">
                    <div class="px-4">
                        <Dialog.Header>
                            <Dialog.Title>Add Child</Dialog.Title>
                            <Dialog.Description>
                                Add a child to your account
                            </Dialog.Description>
                        </Dialog.Header>
                    </div>
                    <Separator/>
                    <ScrollArea class="h-full">
                        {#if (data.session && data.user)}
                            <AddChildForm addChildForm={data.addChildForm} dietaryOptions={data.dietaryOptions}
                                          session={data.session} user={data.user}
                            />
                        {/if}
                    </ScrollArea>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    </div>

    <div class="grid grid-flow-col">

        {#each data.children as child}
            <div class="bg-white rounded-lg shadow-md p-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-4">
                        <Avatar.Root class="h-12 w-12 rounded-lg">
                            <Avatar.Image src={null} alt={child.fullName}/>
                            <Avatar.Fallback class="rounded-lg">{String(child.fullName[0]).toUpperCase()}</Avatar.Fallback>
                        </Avatar.Root>
                        <div>
                            <h3 class="text-lg font-semibold">{child.fullName}</h3>
                            <p class="text-sm text-gray-500">{child.age} years old</p>
                        </div>
                    </div>
                    <a href={`/account/child/${child.id}`}>
                        <Button variant="outline">Edit</Button>
                    </a>
                </div>
            </div>
        {/each}

    </div>


</div>