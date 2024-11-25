<script lang="ts">
    import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'svelte-lucide';
    import logo from '$lib/assets/round logo totojanja.png';

</script>

<footer class="bg-[#8354A4] text-white">
    <div class="container px-4 py-12 mx-auto">
        <div class="grid gap-8 lg:grid-cols-4 justify-center md:justify-start">
            <!-- Logo and Social Section -->
            <div class="space-y-4">
                <img
                        src={logo}
                        alt="Toto Janjaz"

                />
                <p class="max-w-xs text-sm opacity-90 ">
                    Imagine with Us!
                </p>
                <div class="flex gap-4">
                    <a href="/" class="hover:opacity-80">
                        <Facebook class="h-5 w-5" />
                        <span class="sr-only">Facebook</span>
                    </a>
                    <a href="/" class="hover:opacity-80">
                        <Twitter class="h-5 w-5" />
                        <span class="sr-only">Twitter</span>
                    </a>
                    <a href="/" class="hover:opacity-80">
                        <Instagram class="h-5 w-5" />
                        <span class="sr-only">Instagram</span>
                    </a>
                    <a href="/" class="hover:opacity-80">
                        <Linkedin class="h-5 w-5" />
                        <span class="sr-only">LinkedIn</span>
                    </a>
                    <a href="/" class="hover:opacity-80">
                        <Youtube class="h-5 w-5" />
                        <span class="sr-only">YouTube</span>
                    </a>
                </div>
            </div>

            <!-- Updates Section -->
            <div class="space-y-4">
                <h3 class="text-xl font-semibold">Updates</h3>
                <ul class="space-y-2">
                    <li><a href="/" class="hover:underline">Features</a></li>
                    <li><a href="/" class="hover:underline">Pricing</a></li>
                    <li><a href="/" class="hover:underline">Case studies</a></li>
                    <li><a href="/" class="hover:underline">Reviews</a></li>
                    <li><a href="/" class="hover:underline">Updates</a></li>
                </ul>
            </div>

            <!-- Company Section -->
            <div class="space-y-4">
                <h3 class="text-xl font-semibold">Company</h3>
                <ul class="space-y-2">
                    <li><a href="/" class="hover:underline">About</a></li>
                    <li><a href="/" class="hover:underline">Contact us</a></li>
                    <li><a href="/" class="hover:underline">Careers</a></li>
                </ul>
            </div>

            <!-- Contact Section -->
            <div class="space-y-4">
                <h3 class="text-xl font-semibold">Contacts us</h3>
                <ul class="space-y-3">
                    <li class="flex items-center gap-2">
                        <Mail class="h-5 w-5" />
                        <a href="mailto:totojanjaz@gmail.com" class="hover:underline">
                            totojanjaz@gmail.com
                        </a>
                    </li>
                    <li class="flex items-center gap-2">
                        <Phone class="h-5 w-5" />
                        <a href="tel:+255692370870" class="hover:underline">
                            +255 692370870
                        </a>
                    </li>
                    <!--<li class="flex items-start gap-2">
                        <MapPin class="h-5 w-5 mt-1" />
                        <address class="not-italic">
                            794 Mcallister St<br />
                            San Francisco, 94102
                        </address>
                    </li>-->
                </ul>
            </div>
        </div>

        <!-- Bottom Section -->
        <div class="mt-12 pt-8 border-t border-white/20">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                <p>
                    Designed & Developed by
                    <a href="https://seedexr.com" class="underline hover:opacity-80">SeedeXR</a>
                </p>
                <div class="flex gap-4">
                    <p>All Rights Reserved |</p>
                    <a href="/" class="underline hover:opacity-80">Terms and Conditions</a>
                    <span>|</span>
                    <a href="/" class="underline hover:opacity-80">Privacy Policy</a>
                </div>
            </div>
        </div>
    </div>
</footer>