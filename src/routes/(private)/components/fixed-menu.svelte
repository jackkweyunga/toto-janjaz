<script lang="ts">
    import {toggleBold, toggleHeading, setImage, toggleItalic, toggleStrike, addYoutubeVideo} from './button-actions';
    import Button from './bubble-menu-button.svelte';
    import {Bold, Italic, Image, Youtube, Heading1, Heading2, Strikethrough} from "lucide-svelte"
    import * as Select from "$lib/components/ui/select";

    export const {editor}: { editor: any } = $props();

    const headings = [
        {value: "1", label: "h1"},
        {value: "2", label: "h2"},
        {value: "3", label: "h3"},
        {value: "4", label: "h4"},
        {value: "5", label: "h5"}
    ];

    let heading = $state("")

    const headingContent = $derived(
        headings.find((f) => f.value === heading)?.label ?? "style"
    );

</script>

{#if editor}
    <div class="flex gap-2 p-2 items-center">
        <Button {editor} key={"bold"} on:click={() => toggleBold(editor)}>
            <Bold/>
        </Button>
        <Button {editor} key="italic" on:click={() => toggleItalic(editor)}>
            <Italic/>
        </Button>
        <Button {editor} key="strike" on:click={() => toggleStrike(editor)}>
            <Strikethrough/>
        </Button>
        <Select.Root
                type="single"
                name="headings"
                bind:value={heading}
                onValueChange={v => {
                    toggleHeading(editor, parseInt(v))
                }}
        >
            <Select.Trigger class="w-[100px]">
                {headingContent}
            </Select.Trigger>
            <Select.Content>
                <Select.Group>
                    {#each headings as h}
                        <Select.Item
                                value={h.value} label={h.label}
                        >{h.label}</Select.Item>
                    {/each}
                </Select.Group>
            </Select.Content>
        </Select.Root>
        <Button {editor} key="image" on:click={() => {
            const url = window?.prompt("URL")
            if (url) {
                setImage(editor, url)
            }
        }}>
            <Image/>
        </Button>
        <Button {editor} key="youtube-video" on:click={() => {
            const url = window?.prompt("Youtube video link")
            if (url) {
                addYoutubeVideo(editor, url, '640', '480')
            }
        }}>
            <Youtube/>
        </Button>
    </div>
{/if}
