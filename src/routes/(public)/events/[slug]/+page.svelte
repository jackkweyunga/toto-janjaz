<script>
    import { Button } from "$lib/components/ui/button";
</script>

<div class="container mx-auto px-4 py-12 max-w-6xl">
    <section class="space-y-12">
        <div class="text-center">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-[#8657b3] max-w-4xl mx-auto leading-tight">
                The J.K Nyerere Quest On Independence Day.
            </h1>
        </div>

        <div class="prose prose-lg max-w-none">
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but also the leap into electronictypesetting,
                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable
                content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search
                for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the
                years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
        </div>

        <div class="text-center">
            <Button class="bg-[#8657b3] text-white hover:bg-[#6f4696] px-8 py-2 rounded-md text-lg">
                Register Now
            </Button>
        </div>

        <div class="relative h-[500px] w-full rounded-lg overflow-hidden">
            <img
                    src="/placeholder.svg?height=500&width=1000"
                    alt="Children playing tug-of-war on a green field"
                    class="w-full h-full object-cover"
            />
        </div>

        <div class="prose prose-lg max-w-none">
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but also the leap into electronictypesetting,
            </p>
        </div>

        <div class="text-center pb-12">
            <Button class="bg-[#8657b3] text-white hover:bg-[#6f4696] px-8 py-2 rounded-md text-lg">
                Register Now
            </Button>
        </div>
    </section>
</div>

<style>
    :global(.prose) {
        max-width: none;
    }
</style>