<script lang="ts">
    import WorkExperienceCard from "~/components/card/WorkExperienceCard.svelte";
    import type { WorkExperience } from "~/models/work-experience";

    let { workExperiences }: { workExperiences: WorkExperience[] } = $props();
</script>

<section class="pt-4 md:pt-8">
    <h2 class="text-xl md:text-2xl font-bold font-serif text-black pb-4">
        Work Experience
    </h2>
    <div class="relative flex flex-col gap-4 md:gap-10 pb-4 md:pb-8">
        {#each workExperiences as experience (experience.company)}
            <WorkExperienceCard {...experience} />
        {/each}
    </div>
</section>
