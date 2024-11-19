<script lang="ts">
    import {page} from '$app/stores';
    import {Home, Calendar, FileText, Headphones, LogOut} from 'lucide-svelte';
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import NavUser from './nav-user.svelte';
    import logo from "$lib/assets/logo.png";

    const navigation = [
        {name: 'Home', href: '/', icon: Home},
        {name: 'Events', href: '/events', icon: Calendar},
        {name: 'Transactions', href: '/transactions', icon: FileText},
        {name: 'Support', href: '/support', icon: Headphones},
    ];

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
                                <img
                                        src={logo}
                                        alt="Toto Janjaz"
                                        class=" w-full object-contain"
                                />
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
            {#each navigation as item}
                <Sidebar.MenuItem>

                    <a href={item.href}>
                        <Sidebar.MenuButton
                                isActive={currentPath === item.href}
                                class="w-full"
                        >
                            <item.icon
                                    class="h-5 w-5 {currentPath === item.href ? 'text-primary' : ''}"/>
                            <span>{item.name}</span>
                        </Sidebar.MenuButton>
                    </a>
                </Sidebar.MenuItem>
            {/each}
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