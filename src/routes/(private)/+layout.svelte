<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import {ScrollArea} from "$lib/components/ui/scroll-area/index";
    import AppSidebar from "./sidebar.svelte";
    import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
    import {Separator} from "$lib/components/ui/separator";
    import type {LayoutData} from './$types';
    import type {Snippet} from "svelte";

    let {data, children}: { data: LayoutData, children: Snippet } = $props();

</script>

<Sidebar.Provider>

    {#if (data?.user)}
        <AppSidebar user={data?.user}/>
    {/if}

    <Sidebar.Inset>
        <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <Sidebar.Trigger class="-ml-1"/>
<!--            <Separator orientation="vertical" class="mr-2 h-4"/>-->
<!--            <Breadcrumb.Root>-->
<!--                <Breadcrumb.List>-->
<!--                    <Breadcrumb.Item class="hidden md:block">-->
<!--                        <Breadcrumb.Link href="#">Building Your Application</Breadcrumb.Link>-->
<!--                    </Breadcrumb.Item>-->
<!--                    <Breadcrumb.Separator class="hidden md:block"/>-->
<!--                    <Breadcrumb.Item>-->
<!--                        <Breadcrumb.Page>Data Fetching</Breadcrumb.Page>-->
<!--                    </Breadcrumb.Item>-->
<!--                </Breadcrumb.List>-->
<!--            </Breadcrumb.Root>-->
        </header>
        <ScrollArea class="flex flex-1 flex-col gap-4 p-4">
            <main>
                {@render children()}
            </main>
        </ScrollArea>
    </Sidebar.Inset>
</Sidebar.Provider>
