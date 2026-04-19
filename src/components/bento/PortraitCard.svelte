<script lang="ts">
  import Card from "~/components/ui/Card.svelte";
  import CardHead from "~/components/ui/CardHead.svelte";
  import formalSrc from "~/assets/images/senoramadhani-formal.avif?url";
  import casualSrc from "~/assets/images/senoramadhani.avif?url";
</script>

<Card>
  <div class="bento--portrait">
    <CardHead tag="02" label="// portrait"></CardHead>

    <div class="portpair">
      <div class="portpair__a">
        <img src={formalSrc} alt="Seno formal" />
      </div>
      <div class="portpair__b">
        <img src={casualSrc} alt="Seno casual" />
      </div>
    </div>
  </div>
</Card>

<style>
  .bento--portrait {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .portpair {
    position: relative;
    flex: 1;
    margin-top: 8px;
    min-height: 220px;
  }

  .portpair__a,
  .portpair__b {
    position: absolute;
    width: 62%;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid var(--line-hi);
    transition: transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1), z-index 0.45s, box-shadow 0.45s;
    background: var(--card-hi);
  }

  .portpair__a img,
  .portpair__b img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1) contrast(1.1);
  }

  .portpair__a {
    top: 0;
    right: 0;
    transform: rotate(3deg);
    z-index: 2;
  }

  .portpair__b {
    bottom: 0;
    left: 0;
    transform: rotate(-4deg);
    z-index: 1;
    filter: opacity(0.7);
  }

  .bento--portrait:hover .portpair__a {
    transform: rotate(-3deg) translate(-20px, -10px);
    z-index: 1;
  }

  .bento--portrait:hover .portpair__b {
    transform: rotate(4deg) translate(20px, -10px) scale(1.04);
    z-index: 2;
    filter: none;
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6);
  }

  .bento--portrait:hover .portpair__b img {
    filter: none;
  }
</style>
