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
    import AddChildForm from "../../../components/add-child-form.svelte"
    import {ScrollArea} from "$lib/components/ui/scroll-area";
    import * as Avatar from "$lib/components/ui/avatar";

    let {data}: { data: PageData } = $props();

</script>

<svelte:head>
    <title>Account - Toto Janjaz</title>
</svelte:head>

<div class="space-y-4 container w-full">

    <div class="flex justify-between  p-4 items-center">
        <h2 class="text-2xl font-bold ">Update child information</h2>
    </div>

    {#if (data.session && data.user)}
        <AddChildForm addChildForm={data.updateChildForm} dietaryOptions={data.dietaryOptions}
                      session={data.session} user={data.user}
        />
    {/if}

</div>


