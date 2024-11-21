<script lang="ts">

    import AddEventForm from "../../../components/add-event-form.svelte"
    import type {PageData} from "./$types";

    let {data}: { data: PageData } = $props();

</script>


<div class="space-y-4 container w-full">

    <div class="flex justify-between  p-4 items-center">
        <h2 class="text-2xl font-bold ">Add event</h2>
    </div>

    {#if (data?.session && data?.user)}
        <AddEventForm
            addEventForm={data.addEventForm}
            session={data.session}
            eventStates={data.eventStates}
            user={data.user}
        />
    {/if}


</div>