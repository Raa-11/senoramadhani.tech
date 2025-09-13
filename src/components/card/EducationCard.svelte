<script lang="ts">
    import { fade } from "svelte/transition";

    let { 
        school, 
        location, 
        bachelor, 
        period, 
        gpa, 
        honors 
    }: {
        school: string | null;
        location: string | null;
        bachelor: string | null;
        period: [start: Date, end: Date | null];
        gpa: [ipk: number, max: number | null];
        honors: string | null;
    } = $props();
</script>

<div transition:fade>
    <div class="flex flex-col md:flex-row items-start justify-between">
        <div>
            <div class="flex flex-col md:flex-row items-start md:items-center md:gap-2 py-2 md:py-0">
                <h3 class="font-bold font-serif md:text-lg text-black">
                    {school}
                </h3>
            </div>
            <span class="text-sm md:text-base font-serif text-black">{bachelor}</span>
        </div>
        <span class="text-gray-600 font-mono text-sm md:text-base">
            {period[0].toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
            -
            {#if period[1] === null}
                Present,
            {:else}
                {period[1].toLocaleDateString("en-GB", { month: "short", year: "numeric" })},
            {/if}
            {location}
        </span>
    </div>
   <p class="pt-2 text-sm font-serif text-gray-600">
        {#if gpa[1] !== null}
            GPA: {gpa[0]}/{gpa[1].toFixed(2)}{honors ? ` (${honors})` : ""}
        {/if}   
    </p>
</div>
