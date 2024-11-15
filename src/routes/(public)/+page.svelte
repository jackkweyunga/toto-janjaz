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
        <section class="border my-16 md:my-24 overflow-hidden container flex justify-start relative rounded-2xl">
            <div class="   py-20 text-left max-w-2xl">
                <Label class="uppercase text-muted-foreground">Social event</Label>
                <h1 class="text-5xl md:text-5xl font-bold mb-4">
                    The J.K Nyerere Quest On Independence Day
                </h1>
                <p class="text-xl mb-8">
                    Bring your kids, to learn more about how their country got independence and the man behind it, in a
                    fun and intuitive way.
                </p>
                <Button size="lg" class="text-white font-bold px-6 text-lg">
                    Register Now
                    <ChevronRight/>
                </Button>
            </div>
            <img class="h-full absolute bottom-0 right-0" alt="The project logo" src={nyerere}/>
        </section>

        <section class="py-16 space-y-12">
            <div class="font-semibold relative after:rounded-md after:absolute after:h-full py-[20px] flex items-center justify-end after:w-[20px] container w-full text-5xl after:bg-foreground text-foreground">
                <span class="px-12">Earning while Learning at the Nyerere Quest!</span>
            </div>
            <div class="container grid grid-cols-1 md:grid-cols-2 items-center">
                <div class="text-3xl text-justify">
                    The “Janjanomics” system is an interactive currency-based reward system designed to enhance
                    engagement, teamwork, and problem-solving skills within the Nyerere Quest. In this system,
                    participants earn points in the form of Janja (plural Janjaz), a custom currency they accumulate
                    throughout the quest.
                </div>
                <div class="relative h-[400px] w-full flex justify-center">
                    <img class="h-full absolute object-contain" alt="The project logo" src={money}/>
                </div>
            </div>
        </section>

        <section class="py-16 space-y-12">
            <div class="font-semibold relative after:rounded-md after:absolute after:h-full py-[20px] flex items-center justify-start after:w-[20px] container w-full text-5xl after:bg-foreground text-foreground">
                <span class="px-12">Partners</span>
            </div>
            <div class="container grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                {#each partners as partner}
                    <div class="flex items center relative h-[250px]">
                        <img class="h-fit max-h-[250px] absolute object-contain" alt="The project logo" src={partner.logo}/>
                    </div>
                {/each}
            </div>
        </section>
    </main>

</div>