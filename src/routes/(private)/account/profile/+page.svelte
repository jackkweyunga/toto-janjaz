<script lang="ts">

    import type {PageData} from "./$types";
    import UpdateProfileForm from "../components/update-profile-form.svelte"

    let {data}: { data: PageData } = $props();

</script>


<!-- User profile update form -->

<div>
    {#if (data?.session && data?.user) }
        <UpdateProfileForm updateProfileForm={data.updateProfileForm} session={data?.session} user={data?.user} />
    {/if}
</div>
