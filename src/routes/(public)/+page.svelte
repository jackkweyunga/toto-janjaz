<!-- src/routes/+page.svelte -->
<script lang="ts">
    import {Button} from "$lib/components/ui/button";
    import {ChevronRight} from "svelte-lucide";
    import nyerere from '$lib/assets/nyerere.png';
    import money from '$lib/assets/money.png';
    import kiko from '$lib/assets/kiko.png';
    import ona from '$lib/assets/ona.png';
    import seede from '$lib/assets/seede.png';
    import zaidi from '$lib/assets/zaidi.png';
    import pea from '$lib/assets/pea.png';
    import KidVR from '$lib/assets/Kid_in_VR.png';

    import {Label} from "$lib/components/ui/label";

    const partners = [
        {
            name: 'SeedeXR',
            logo: seede,
        },
        {
            name: 'kiko',
            logo: kiko
        },
        {
            name: 'Ona',
            logo: ona
        },
        {
            name: 'Zaidi',
            logo: zaidi
        },
        {
            name: 'Pea',
            logo: pea
        }
    ]

</script>

<div class="flex flex-col min-h-screen">

    <main class="flex-grow">
        <section class="border my-16 md:my-24 overflow-hidden container flex flex-col ms:flex-row justify-start relative rounded-2xl bg-card-eventBG">
            <div class="   py-20 text-left max-w-2xl">
                <Label class="uppercase text-muted-foreground">Social event</Label>
                <h1 class="text-5xl md:text-5xl font-bold mb-4">
                    The Nyerere Quest On Independence Day
                </h1>
                <p class="text-xl mb-8">
                    Bring your kids, to learn more about how their country got independence and the man behind it, in a
                    fun and intuitive way.
                </p>
                <a href="/events/t3u7ddjtl2pycg09vu8wzjam" class="flex items-center space-x-2">
                    <Button size="lg">
                        RSVP Now
                    </Button>
                    <ChevronRight class="h-8 w-8 text-primary"/>
                </a>
            </div>
            <img class="h-full w-full md:w-auto md:absolute bottom-0 right-0" alt="The project logo" src={nyerere}/>
        </section>

        <section class="py-16 space-y-12">
            <div class="font-semibold relative after:rounded-md after:absolute after:h-full py-[20px] flex items-center justify-start after:w-[20px] container w-full text-5xl after:bg-primary">
                <span class="px-12 text-primary">A Glimpse Into the Adventure!</span>
            </div>
            <div class="container grid grid-cols-1 md:grid-cols-2 items-center">
                <div class="text-lg md:text-3xl text-justify">
                    kids will use virtual reality to travel back in time and step into the world of Tanzania’s rich history.
                </div>
                <div class="relative h-[400px] w-full flex justify-end">
                    <img class="h-full absolute object-contain" alt="The project logo" src={KidVR}/>
                </div>
            </div>
        </section>

        <section class="py-16 space-y-12">
            <div class="font-semibold relative after:rounded-md after:absolute after:h-full py-[20px] flex items-center justify-end after:w-[20px] container w-full text-5xl after:bg-primary">
                <span class="px-12 text-primary font-sans">Earning while Learning at the Nyerere Quest!</span>
            </div>
            <div class="container grid grid-cols-1 md:grid-cols-2 items-center">
                <div class="relative h-[400px] w-full flex justify-start">
                    <img class="h-full absolute object-contain" alt="The project logo" src={money}/>
                </div>
                <div class="text-xl md:text-3xl text-justify">
                    As participants complete challenges, they’ll earn points in the form of Janja Coins, awarded based on their performance in room challenges and trivia games.
                </div>
            </div>
        </section>

        <section class="py-16 space-y-12">
            <div class="font-semibold relative after:rounded-md after:absolute after:h-full py-[20px] flex items-center justify-start after:w-[20px] container w-full text-5xl after:bg-primary text-foreground">
                <span class="px-12 text-primary">Partners</span>
            </div>
            <div class="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
                {#each partners as partner}
                    <div class="flex items center relative h-[250px]">
                        <img class="h-fit max-h-[250px] absolute object-contain" alt="The project logo" src={partner.logo}/>
                    </div>
                {/each}
            </div>
        </section>
    </main>

</div>