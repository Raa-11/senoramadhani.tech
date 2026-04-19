<script lang="ts">
  import { onMount } from 'svelte';

  export let tilt  = false;
  export let glow  = false;
  export let className = '';

  let el: HTMLDivElement;

  onMount(() => {
    if (!tilt && !glow) return;
    let raf: number;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (tilt) {
          el.style.setProperty('--tx', `${-y * 8}deg`);
          el.style.setProperty('--ty', `${x * 8}deg`);
        }
        el.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
        el.style.setProperty('--my', `${(y + 0.5) * 100}%`);
      });
    };
    const onLeave = () => {
      el.style.setProperty('--tx', '0deg');
      el.style.setProperty('--ty', '0deg');
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  });
</script>

<div
  bind:this={el}
  class="group relative rounded-[14px] bg-card border border-line p-[18px_20px] overflow-hidden flex flex-col h-full hover:border-line-hi transition-colors duration-200 {className}"
  style="perspective: 1200px;"
>
  {#if glow}
    <span
      class="pointer-events-none absolute -inset-px rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style="background: radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--accent) 35%, transparent), transparent 40%)"
      aria-hidden="true"
    ></span>
  {/if}

  <div
    class="flex flex-col flex-1 gap-3"
    style={tilt ? 'transform: rotateX(var(--tx,0deg)) rotateY(var(--ty,0deg)); transform-style: preserve-3d; transition: transform .25s cubic-bezier(.2,.7,.2,1);' : ''}
  >
    <slot />
  </div>
</div>
