<script lang="ts">
  import { onMount } from "svelte";

  const ASCII_NAME = [
    " ██████╗ ██████╗  ██████╗ ",
    "██╔════╝ ██╔══██╗ ██╔══██╗",
    "╚█████╗  ██████╔╝ ██║  ██║",
    " ╚═══██╗ ██╔══██╗ ██║  ██║",
    "██████╔╝ ██║  ██║ ██████╔╝",
    "╚═════╝  ╚═╝  ╚═╝ ╚═════╝ ",
  ];

  let lines = 0;

  onMount(() => {
    const id = setInterval(() => {
      lines++;
      if (lines >= ASCII_NAME.length) clearInterval(id);
    }, 180);
    return () => clearInterval(id);
  });
</script>

<pre
  class="font-mono leading-[1.05] tracking-[-0.04em] whitespace-pre font-bold text-ink mt-2 overflow-hidden"
  style="font-size: clamp(10px, 1.6vw, 20px); text-shadow: 0 0 22px color-mix(in oklab, var(--accent) 40%, transparent);"
  aria-label="SRD">{ASCII_NAME.slice(0, lines).join(
    "\n",
  )}{#if lines < ASCII_NAME.length}<span
      class="inline-block w-[0.55em] bg-accent animate-bento-blink"
      aria-hidden="true">█</span
    >{/if}</pre>
