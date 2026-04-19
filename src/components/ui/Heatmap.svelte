<script lang="ts">
  export let cells: number[] = [];

  const lvlClass = [
    'bg-muted-2/20',
    'bg-accent/[0.22]',
    'bg-accent/45',
    'bg-accent/[0.72]',
    'bg-accent',
  ];
</script>

<div class="mt-1.5 flex-1 flex flex-col">
  <div class="grid gap-[3px] flex-1" style="grid-template-columns: repeat(53, 1fr)">
    {#each Array(53) as _, w}
      <div class="grid gap-[3px]" style="grid-template-rows: repeat(7, 1fr)">
        {#each Array(7) as _, d}
          {@const lvl = cells[w * 7 + d] ?? 0}
          <div
            class="aspect-square rounded-[2px] transition-transform duration-150 hover:scale-[1.6] hover:z-10 hover:relative {lvlClass[lvl]}"
            class:shadow-[0_0_6px_color-mix(in_oklab,var(--accent)_50%,transparent)]={lvl === 4}
          ></div>
        {/each}
      </div>
    {/each}
  </div>
  <div class="flex gap-1 items-center justify-end font-mono text-[10px] mt-2.5 text-muted">
    <span>less</span>
    {#each [0,1,2,3,4] as l}
      <div class="w-[10px] h-[10px] rounded-[2px] {lvlClass[l]}"></div>
    {/each}
    <span>more</span>
  </div>
</div>
