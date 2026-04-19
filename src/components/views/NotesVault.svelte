<script lang="ts">
  export let notes: any[] = [];

  let searchQuery = "";
  let selectedCategory = "All";
  let currentPage = 1;
  const PER_PAGE = 6;

  $: categories = ["All", ...new Set(notes.map((n) => n.data.category))];

  $: filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.data.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.data.tags.some((t: string) =>
        t.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "All" || note.data.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  $: {
    searchQuery;
    selectedCategory;
    currentPage = 1;
  }

  $: totalPages = Math.ceil(filteredNotes.length / PER_PAGE);
  $: pagedNotes = filteredNotes.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
</script>

<div class="flex flex-col gap-0 flex-1">
  <!-- Header -->
  <div
    class="flex items-start justify-between gap-4 px-6 py-6 bg-card border border-line-hi rounded-t-[14px] border-b-0"
  >
    <div class="flex flex-col gap-1.5">
      <div class="flex items-center gap-2.5">
        <span
          class="font-mono text-[10px] font-bold tracking-[0.06em] bg-accent text-accent-on px-1.5 py-0.5 rounded"
          >06</span
        >
        <span class="font-mono text-[11px] text-muted tracking-[0.04em]"
          >// blog.notes</span
        >
      </div>
      <h1
        class="font-display text-2xl font-black tracking-[-0.03em] text-ink leading-tight my-1"
      >
        Blog & Notes
      </h1>
      <p class="font-mono text-[11px] text-muted m-0">
        Things I learned the hard way, and some I'm still figuring out.
      </p>
    </div>

    <div
      class="flex flex-col items-center justify-center w-14 h-14 rounded-[10px] border border-line-hi bg-card-hi shrink-0"
    >
      <span
        class="font-display text-2xl font-black text-accent leading-none tracking-[-0.03em]"
        >{notes.length}</span
      >
      <span class="font-mono text-[9px] text-muted uppercase tracking-[0.06em]"
        >posts</span
      >
    </div>
  </div>

  <!-- Controls -->
  <div
    class="flex items-center gap-2 px-5.5 py-3 bg-card-hi border border-line-hi border-b-0"
  >
    <div class="relative flex-1 flex items-center">
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="absolute left-2.5 text-muted pointer-events-none"
      >
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="search notes, tags..."
        class="w-full pl-7.5 pr-3 py-1.5 bg-card border border-line-hi rounded-[7px] font-mono text-[11.5px] text-ink outline-none transition-colors duration-150 placeholder-muted focus:border-[color-mix(in_oklab,var(--accent)_55%,transparent)]"
      />
    </div>
    <div class="flex gap-1.5">
      {#each categories as cat}
        <button
          on:click={() => (selectedCategory = cat)}
          class="inline-flex items-center gap-1 px-2.75 py-1.25 font-mono text-[10px] font-semibold uppercase tracking-[0.06em] rounded-[7px] border border-line-hi bg-card text-muted cursor-pointer transition-all duration-150 whitespace-nowrap {selectedCategory ===
          cat
            ? 'bg-accent text-accent-on border-accent'
            : 'hover:text-ink'}"
        >
          {cat}
          <span class="text-[9px] opacity-60"
            >{cat === "All"
              ? notes.length
              : notes.filter((n) => n.data.category === cat).length}</span
          >
        </button>
      {/each}
    </div>
  </div>

  <!-- Grid -->
  <div
    class="grid grid-cols-1 auto-rows-fr gap-px flex-1 bg-line-hi border border-line-hi {totalPages >
    1
      ? 'rounded-b-0 border-b-0'
      : 'rounded-b-[14px]'} overflow-hidden"
  >
    {#if filteredNotes.length === 0}
      <div
        class="font-mono text-[12px] text-muted text-center py-16 col-span-2"
      >
        no results found.
      </div>
    {:else}
      {#each pagedNotes as note, i}
        {@const globalIdx = (currentPage - 1) * PER_PAGE + i + 1}
        <a
          href={`/blog/${note.id}`}
          class="flex flex-col justify-between p-[12px_20px] bg-card no-underline transition-colors duration-150 overflow-hidden hover:bg-card-hi group"
        >
          <div class="flex items-center justify-between">
            <span
              class="font-mono text-[10px] font-bold text-accent tracking-[0.06em]"
              >{String(globalIdx).padStart(2, "0")}</span
            >
            <span class="font-mono text-[10.5px] text-muted"
              >{formatDate(note.data.date)}</span
            >
          </div>
          <h3
            class="font-display text-[15px] font-bold text-ink tracking-[-0.02em] leading-tight m-0"
          >
            {note.data.title}
          </h3>
          <p class="text-[12px] text-muted leading-[1.45] m-0 line-clamp-1">
            {note.data.description}
          </p>
          <div class="flex items-center justify-between gap-2">
            <div class="flex gap-2 flex-wrap">
              {#each note.data.tags as tag}
                <span class="font-mono text-[10px] text-muted opacity-65"
                  >#{tag}</span
                >
              {/each}
            </div>
            <div class="flex items-center gap-2">
              {#if note.data.source}
                <span
                  class="font-mono text-[9.5px] text-accent border border-[color-mix(in_oklab,var(--accent)_30%,transparent)] bg-[color-mix(in_oklab,var(--accent)_8%,transparent)] rounded px-1.75 py-px whitespace-nowrap"
                  >{note.data.source} ↗</span
                >
              {/if}
              <span
                class="font-mono text-[10.5px] text-muted transition-colors duration-150 group-hover:text-accent"
                >read →</span
              >
            </div>
          </div>
        </a>
      {/each}
    {/if}
  </div>

  <!-- Pagination -->
  {#if totalPages > 1}
    <div
      class="flex items-center justify-center gap-3 p-4 bg-card border border-line-hi border-t-0 rounded-b-[14px]"
    >
      <button
        class="font-mono text-[11px] text-muted bg-none border-0 cursor-pointer px-2 py-1 rounded transition-all duration-150 disabled:opacity-30 disabled:cursor-default hover:text-accent hover:bg-[color-mix(in_oklab,var(--accent)_8%,transparent)]"
        disabled={currentPage === 1}
        on:click={() => currentPage--}>← prev</button
      >
      <div class="flex items-center gap-1.5">
        {#each Array(totalPages) as _, i}
          <button
            class="font-mono text-[11px] w-7 h-7 rounded border {currentPage ===
            i + 1
              ? 'bg-accent text-accent-on border-accent'
              : 'border-line-hi bg-card-hi text-muted hover:text-ink hover:border-accent'} cursor-pointer transition-all duration-150"
            on:click={() => (currentPage = i + 1)}
          >
            {i + 1}
          </button>
        {/each}
      </div>
      <button
        class="font-mono text-[11px] text-muted bg-none border-0 cursor-pointer px-2 py-1 rounded transition-all duration-150 disabled:opacity-30 disabled:cursor-default hover:text-accent hover:bg-[color-mix(in_oklab,var(--accent)_8%,transparent)]"
        disabled={currentPage === totalPages}
        on:click={() => currentPage++}>next →</button
      >
    </div>
  {/if}
</div>
