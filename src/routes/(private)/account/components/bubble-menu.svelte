<script>
    import { toggleBold, toggleItalic, toggleStrike } from './button-actions.js';
    export let editor;
    import Button from './bubble-menu-button.svelte';
</script>

{#if editor}
    <div class="bubble-menu">
        <Button {editor} key="bold" on:click={() => toggleBold(editor)} />
        <Button {editor} key="italic" on:click={() => toggleItalic(editor)} />
        <Button {editor} key="strike" on:click={() => toggleStrike(editor)} />
    </div>
{/if}

