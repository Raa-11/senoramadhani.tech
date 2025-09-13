<script lang="ts">
    import type { Education } from '~/models/education.ts';
    import EducationCard from '~/components/card/EducationCard.svelte';

    // Svelte 5 props
    let { educations }: { educations: Education[] } = $props();
</script>

<section class="pt-4 md:pt-8">
    <h2 class="text-xl md:text-2xl font-bold font-serif text-black pb-4">
        Education
    </h2>
    <div class="relative flex flex-col gap-4 md:gap-10 pb-4 md:pb-8">
        {#each educations as education (education.school)}
            <EducationCard {...education} />
        {/each}
    </div>
</section>
