<script>
    import logo from "$lib/assets/logo.png";
    import {Button} from "$lib/components/ui/button";
    import {page} from "$app/stores"

</script>

<header class="bg-white">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="text-2xl font-bold text-purple-600">
            <img class="h-[100px]" alt="The project logo" src={logo}/>
        </div>
        <ul class="flex space-x-4 items-center">
            <li><a href="/" class="text-gray-600 hover:text-purple-600">Home</a></li>
            <li><a href="/about" class="text-gray-600 hover:text-purple-600">About</a></li>
            <li><a href="/events" class="text-gray-600 hover:text-purple-600">Events</a></li>
            <li><a href="/swagz" class="text-gray-600 hover:text-purple-600">Swagz</a></li>
            {#if $page.data.session }
                <li>
                    <a href="/account" class="text-gray-600 hover:text-purple-600">
                       Go to Account
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
    </nav>
</header>