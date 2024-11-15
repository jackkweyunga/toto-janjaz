<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import Google from "$lib/assets/icons/google.svg";
    import Apple from "$lib/assets/icons/apple.svg";

    function handleGoogleSignIn() {
        // Handle Google sign in
        console.log("Sign in with Google");
    }

    function handleAppleSignIn() {
        // Handle Apple sign in
        console.log("Sign in with Apple");
    }
</script>

<div class="h-[500px] bg-background flex items-center justify-center p-4">
    <div class="w-full max-w-md space-y-8">

        <div class="text-center">
            <h2 class="mt-6 text-3xl font-bold tracking-tight text-primary">
                Sign in to TotoJanjaz
            </h2>
            <p class="mt-2 text-sm text-muted-foreground">
                Or <a href="/register" class="font-medium text-primary hover:text-primary/80">create an account</a> if you don't have one
            </p>
        </div>

        <div class="mt-6">
            <div class="relative">
                <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-muted"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-background text-muted-foreground">Continue with</span>
                </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" class="w-full flex items-center" on:click={handleGoogleSignIn}>
                    <div class="h-5 w-5 mr-2">
                        <img src={Google} alt="google icon" />
                    </div>
                    <span>Google</span>
                </Button>
                <Button variant="outline" class="w-full flex items-center" on:click={handleAppleSignIn}>
                    <div class="h-5 w-5 mr-2">
                        <img alt="apple icon" src={Apple} />
                    </div>
                    <span>Apple</span>
                </Button>
            </div>
        </div>

    </div>
</div>