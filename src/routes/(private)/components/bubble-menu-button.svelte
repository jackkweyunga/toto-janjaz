<script>
    export let editor;
    export let key;
    import {
        buttonVariants
    } from "$lib/components/ui/button";
</script>

{#if editor}
    <button type="button" class={buttonVariants({ variant: "outline"})} class:active={editor.isActive(key)} on:click>
        <slot />
    </button>
{/if}

<style>
    button {
        margin: 0;
    }

    button.active {
        background: black;
        color: white;
    }
</style>