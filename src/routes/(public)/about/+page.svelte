<script>
    import { Card } from '$lib/components/ui/card';
</script>

<div class="container mx-auto px-4 py-12 max-w-6xl">
    <section class="space-y-8 mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-[#8657b3]">What is TotoJanjaz?</h1>
        <div class="space-y-6 text-lg">
            <p>
                TotoJanjaz is an innovative initiative dedicated to elevating the level of educational and recreational experiences
                available to children. Our program is tailored for students aged 6 to 12, providing a safe and fun environment for
                developing social, cognitive, language, and motor skills, all while nurturing a growth mindset.
            </p>
            <p>
                We partner with schools to design engaging, tailored activities that seamlessly fit into school curriculums and
                holiday programs, making learning and play equally rewarding.
            </p>
        </div>
    </section>

    <section class="space-y-8">
        <h2 class="text-4xl md:text-5xl font-bold text-[#8657b3]">What We Do</h2>
        <p class="text-lg">
            TotoJanjaz offers a wide array of bespoke activities designed for both regular school programs and holiday events,
            ensuring that learning continues beyond the classroom. Our key offerings include:
        </p>

        <div class="grid md:grid-cols-2 gap-8 pt-8">
            <Card class="border-none shadow-none">
                <div class="space-y-4 text-center">
                    <div class="w-24 h-24 mx-auto">
                        <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                class="w-full h-full text-[#7cb342]"
                                stroke="currentColor"
                        >
                            <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm3-4c.83 0 1.5-.67 1.5-1.5S10.83 4 10 4s-1.5.67-1.5 1.5S9.17 7 10 7z"
                                    fill="currentColor"
                            />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-semibold text-gray-700">Engaging Games</h3>
                    <p class="text-gray-600">
                        Interactive and fun games that promote teamwork, problem-solving, and critical thinking.
                    </p>
                </div>
            </Card>

            <Card class="border-none shadow-none">
                <div class="space-y-4 text-center">
                    <div class="w-24 h-24 mx-auto">
                        <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                class="w-full h-full text-[#8657b3]"
                                stroke="currentColor"
                        >
                            <path
                                    d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H3V6h18v12z"
                                    fill="currentColor"
                            />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-semibold text-gray-700">Immersive Storytelling</h3>
                    <p class="text-gray-600">
                        Captivating storytelling sessions that spark imagination and improve language skills.
                    </p>
                </div>
            </Card>

            <Card class="border-none shadow-none">
                <div class="space-y-4 text-center">
                    <div class="w-24 h-24 mx-auto">
                        <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                class="w-full h-full text-[#ffa726]"
                                stroke="currentColor"
                        >
                            <path
                                    d="M20 7v10H4V7h16m0-2H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z"
                                    fill="currentColor"
                            />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-semibold text-gray-700">Original School Plays</h3>
                    <p class="text-gray-600">
                        Customized performances that encourage creativity, teamwork, and confidence.
                    </p>
                </div>
            </Card>

            <Card class="border-none shadow-none">
                <div class="space-y-4 text-center">
                    <div class="w-24 h-24 mx-auto">
                        <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                class="w-full h-full text-[#ff7043]"
                                stroke="currentColor"
                        >
                            <path
                                    d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"
                                    fill="currentColor"
                            />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-semibold text-gray-700">Targeted Learning Experiences</h3>
                    <p class="text-gray-600">
                        Hands-on workshops and sessions tailored to meet the unique needs of each student group.
                    </p>
                </div>
            </Card>
        </div>
    </section>
</div>