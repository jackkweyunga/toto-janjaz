<script lang="ts">
    import {page} from '$app/stores';
    import {Home, Calendar, FileText, Headphones, LogOut, Users2} from 'lucide-svelte';
    import NavUser from './nav-user.svelte';
    import logo from "$lib/assets/logo.png";
    import type {users} from "$lib/server/db/schema";
    import * as Collapsible from "$lib/components/ui/collapsible/index.js";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import ChevronRight from "lucide-svelte/icons/chevron-right";
    import Settings2 from "lucide-svelte/icons/settings-2";

    const {user}: { user: typeof users.$inferSelect } = $props()

    type Navigation = {
        title: string;
        url: string;
        // this should be `Component` after lucide-svelte updates types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        icon?: any;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[]

    const navigation: Navigation = [
        {title: 'Home', isActive: true, url: '/account', icon: Home},
        {title: 'Events', isActive: true, url: '/account/events', icon: Calendar},
        {title: 'Children', isActive: true, url: '/account/children', icon: Users2},
        {title: 'Support', isActive: true, url: '/support', icon: Headphones}
    ];

    const adminNavigation = [
        {
            title: "Manage",
            url: "#",
            icon: Settings2,
            isActive: true,
            items: [
                {
                    title: "Events",
                    url: "/admin/events",
                },
                {
                    title: "RSVPs",
                    url: "/admin/rsvps",
                },
                {
                    title: 'Transactions',
                    url: '/admin/transactions'
                },
                {
                    title: 'Users',
                    url: '/admin/users'
                },
                {
                    title: 'Test Payment',
                    url: '/admin/test-payment'
                }
            ],
        }
    ]

    const data = {
        user: {
            name: $page.data.session?.user?.name!,
            email: $page.data.session?.user?.email!,
            avatar: $page.data.session?.user?.image!,
        },
    }

    const currentPath = $derived($page.url.pathname);

</script>

<Sidebar.Root variant="sidebar" collapsible="icon">
    <Sidebar.Header>
        <Sidebar.Menu>
            <Sidebar.MenuItem>
                <Sidebar.MenuButton size="lg">
                    {#snippet child({props})}
                        <a href="##" {...props}>
                            <div
                                    class=" text-sidebar-primary-foreground aspect-square flex items-center h-full justify-center rounded-lg"
                            >
                                <div class=" w-8 h-8 border bg-primary rounded-md object-contain"
                                ></div>
                            </div>
                            <div class="flex flex-col gap-0.5 leading-none">
                                <span class="font-semibold">
                                    Toto Janjaz
                                </span>
                                <small class="">v1.0.0</small>
                            </div>
                        </a>
                    {/snippet}
                </Sidebar.MenuButton>
            </Sidebar.MenuItem>
        </Sidebar.Menu>
    </Sidebar.Header>

    <Sidebar.Content>
        <Sidebar.Menu>
            <Sidebar.Group>
                <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
                <Sidebar.Menu>
                    {#each navigation as mainItem (mainItem.title)}
                        <Collapsible.Root open={mainItem.isActive} class="group/collapsible">
                            {#snippet child({props})}
                                <Sidebar.MenuItem {...props}>
                                    <a href={mainItem.url} {...props}>

                                        <Sidebar.MenuButton {...props}>

                                            {#snippet tooltipContent()}
                                                {mainItem.title}
                                            {/snippet}
                                            {#if mainItem.icon}
                                                <mainItem.icon/>
                                            {/if}
                                            <span>{mainItem.title}</span>
                                        </Sidebar.MenuButton>
                                    </a>

                                </Sidebar.MenuItem>
                            {/snippet}
                        </Collapsible.Root>
                    {/each}
                </Sidebar.Menu>
            </Sidebar.Group>
            <Sidebar.Group>
                <Sidebar.GroupLabel>Administration</Sidebar.GroupLabel>
                <Sidebar.Menu>
                    {#each adminNavigation as mainItem (mainItem.title)}
                        <Collapsible.Root open={mainItem.isActive} class="group/collapsible">
                            {#snippet child({props})}
                                <Sidebar.MenuItem {...props}>
                                    <Collapsible.Trigger>
                                        {#snippet child({props})}
                                            <Sidebar.MenuButton {...props}>
                                                {#snippet tooltipContent()}
                                                    {mainItem.title}
                                                {/snippet}
                                                {#if mainItem.icon}
                                                    <mainItem.icon/>
                                                {/if}
                                                <span>{mainItem.title}</span>
                                                <ChevronRight
                                                        class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                                />
                                            </Sidebar.MenuButton>
                                        {/snippet}
                                    </Collapsible.Trigger>
                                    <Collapsible.Content>
                                        {#if mainItem.items}
                                            <Sidebar.MenuSub>
                                                {#each mainItem.items as subItem (subItem.title)}
                                                    <Sidebar.MenuSubItem>
                                                        <Sidebar.MenuSubButton>
                                                            {#snippet child({props})}
                                                                <a href={subItem.url} {...props}>
                                                                    <span>{subItem.title}</span>
                                                                </a>
                                                            {/snippet}
                                                        </Sidebar.MenuSubButton>
                                                    </Sidebar.MenuSubItem>
                                                {/each}
                                            </Sidebar.MenuSub>
                                        {/if}
                                    </Collapsible.Content>
                                </Sidebar.MenuItem>
                            {/snippet}
                        </Collapsible.Root>
                    {/each}
                </Sidebar.Menu>
            </Sidebar.Group>
        </Sidebar.Menu>
    </Sidebar.Content>

    <Sidebar.Footer class="border-t">
        <NavUser user={data.user}/>
    </Sidebar.Footer>
</Sidebar.Root>

<style>
    :global(.active-link) {
        @apply bg-primary/10 text-primary;
    }
</style>