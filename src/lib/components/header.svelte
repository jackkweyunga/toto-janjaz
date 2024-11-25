<script lang="ts">
    import logo from "$lib/assets/logo.png";
    import {Button} from "$lib/components/ui/button";
    import {page} from "$app/stores"
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import {Input} from "$lib/components/ui/input/index.js";
    import {Label} from "$lib/components/ui/label/index.js";
    import {MenuIcon} from "lucide-svelte";

</script>

<header class="bg-white">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="text-2xl font-bold text-purple-600">
            <img class="h-[100px]" alt="The project logo" src={logo}/>
        </div>
        <ul class="hidden md:flex space-x-4 items-center">
            <li><a href="/" class="text-gray-600 hover:text-purple-600">Home</a></li>
            <li><a href="/about" class="text-gray-600 hover:text-purple-600">About</a></li>
            <li><a href="/events" class="text-gray-600 hover:text-purple-600">Events</a></li>
            <li><a href="/swagz" class="text-gray-600 hover:text-purple-600">Swagz</a></li>
            {#if $page.data.session }
                <li>
                    <a href="/account" class="text-gray-600 hover:text-purple-600">
                        Account
                    </a>
                </li>
            {:else}
                <li>
                    <a href="/login">
                        <Button>
                            Sign In
                        </Button>
                    </a>
                </li>
            {/if}
        </ul>


        <div class="flex md:hidden">

            <Sheet.Root>
                <Sheet.Trigger>
                    <MenuIcon class="h-8 w-8 text-gray-600 mr-4"/>
                </Sheet.Trigger>
                <Sheet.Content side="right" class="space-y-12">
                    <Sheet.Header>
                        <Sheet.Title>Menu</Sheet.Title>
                        <Sheet.Description>
                            Navigation
                        </Sheet.Description>
                    </Sheet.Header>
                    <ul class="flex flex-col space-y-6 items-center">
                        <li><a href="/" class="text-gray-600 hover:text-purple-600">Home</a></li>
                        <li><a href="/about" class="text-gray-600 hover:text-purple-600">About</a></li>
                        <li><a href="/events" class="text-gray-600 hover:text-purple-600">Events</a></li>
                        <li><a href="/swagz" class="text-gray-600 hover:text-purple-600">Swagz</a></li>
                        {#if $page.data.session }
                            <li>
                                <a href="/account" class="text-gray-600 hover:text-purple-600">
                                    Account
                                </a>
                            </li>
                        {:else}
                            <li>
                                <a href="/login">
                                    <Button>
                                        Sign In
                                    </Button>
                                </a>
                            </li>
                        {/if}
                    </ul>
                </Sheet.Content>
            </Sheet.Root>
        </div>

    </nav>
</header>