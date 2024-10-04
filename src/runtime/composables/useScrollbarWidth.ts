import { type Ref, ref, onMounted, onUnmounted } from "vue";

// Calculates scrollbar width for an HTML element reactively.
// This is needed for gutter layout happening on Chrome & Opera.
export default function useScrollbarWidth(
  elementRef: Ref<HTMLElement | null>
): Ref<number> {
  const scrollbarWidth = ref<number>(0);
  let resizeObserver: ResizeObserver;

  function update() {
    const scrollEl = elementRef.value!;
    scrollbarWidth.value = scrollEl.offsetWidth - scrollEl.clientWidth;
  }

  onMounted(() => {
    const element = elementRef.value!;

    // initial calculation
    update();

    // recalculate whenever window size or zoom level changes
    window.addEventListener("resize", update, false);

    // recalculate whenever element size changes
    resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(element);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", update);
    resizeObserver.disconnect();
  });

  return scrollbarWidth;
}
