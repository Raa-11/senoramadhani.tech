<script lang="ts">
    import { fade } from "svelte/transition";
    import type { Skill } from '~/models/skill.ts';

    // use $props for Svelte 5
    let { skills }: { skills: Skill } = $props();
</script>

<section class="pt-4 md:pt-8">
    <h2 class="text-xl md:text-2xl font-bold font-serif text-black pb-4">
        Skills
    </h2>
    <div class="relative flex flex-col gap-4 md:gap-10 pb-4 md:pb-8">
        <div transition:fade class="flex flex-wrap items-center pt-2 gap-2">
            {#each skills.skill as skill (skill)}
                <span
                    class="flex items-center font-mono uppercase text-gray-100 bg-gray-700/90 text-xs rounded-md px-2 py-1"
                >
                    {skill}
                </span>
            {/each}
        </div>
    </div>
</section>
