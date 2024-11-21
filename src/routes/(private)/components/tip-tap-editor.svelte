<script lang="ts">
    import {onMount, onDestroy} from 'svelte';
    import {derived, writable} from 'svelte/store';
    import {Editor} from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';

    // @todo this throws a 'process is not defined' error in the Svelte REPL.
    // Uncomment the next line to see the REPL issue.
    // import BubbleMenu from '@tiptap/extension-bubble-menu'
    import FixedMenu from './fixed-menu.svelte';
    import {Separator} from "$lib/components/ui/separator";
    import Image from "@tiptap/extension-image";
    import Dropcursor from "@tiptap/extension-dropcursor";
    import Youtube from "@tiptap/extension-youtube";

    let {content = $bindable()}: { content: string } = $props();

    const contentStore = writable(content)

    let element: any = $state();
    let editor: any = $state();
    let editorHtml: string = $state("");
    let editorJson: string = $state("");

    onMount(() => {
        editor = new Editor({
            element,
            extensions: [
                StarterKit.configure({
                    heading: {
                        levels: [1, 2, 3, 4, 5]
                    }
                }),
                Image.configure({
                    inline: true,
                }),
                Dropcursor,
                Youtube.configure({
                    controls: false,
                    nocookie: true,
                }),
            ],
            content,
            onTransaction: () => {
                editor = editor;
            },
            editorProps: {
                attributes: {
                    class: 'prose p-4 rounded-md prose-sm  sm:prose-base prose-p:my-0 focus:outline-none',
                },
            },
        });
        editor.on('update', ({editor}: { editor: any }) => {
            console.log('editor html', editor?.getHTML());
            editorHtml = editor?.getHTML();
            editorJson = editor?.getJSON();
            contentStore.set(editor?.getHTML());
            content = editor?.getHTML();
        });
    });

    onDestroy(() => {
        editor?.destroy();
    });
</script>

<div class="w-full flex flex-col items-center py-6">

    <div class="border-2 w-full shadow-sm max-w-3xl border-muted rounded-md overflow-hidden">
        <FixedMenu editor={editor}/>
        <Separator/>
        <div bind:this={element}></div>
    </div>

    <!--{#if editor}-->
    <!--    <pre class="json-output">-->
    <!--        {JSON.stringify(editorJson, null, 2)}-->
    <!--    </pre>-->

    <!--    <div class="html-output">-->
    <!--        {editorHtml}-->
    <!--    </div>-->

    <!--    <div class="prose">-->
    <!--        {@html $contentStore}-->
    <!--    </div>-->
    <!--{/if}-->


</div>

