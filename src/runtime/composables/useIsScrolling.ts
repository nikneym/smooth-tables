import { type Ref, ref, onMounted, onUnmounted } from "vue";

// Tracks the given element ref's scroll state reactively
export default function useIsScrolling(
  elementRef: Ref<HTMLElement | null>,
  waitThreshold: number = 10
) {
  const isScrolling = ref<boolean>(false);

  onMounted(() => {
    const el = elementRef.value!;

    let timer: number = -1;

    function onScroll() {
      // user is scrolling
      if (timer !== -1) {
        clearTimeout(timer);
        isScrolling.value = true;
      }

      // scrolling has ended
      // @ts-expect-error
      timer = setTimeout(() => (isScrolling.value = false), waitThreshold);
    }

    el.addEventListener("scroll", onScroll, false);

    // remove scroll event on unmount
    onUnmounted(() => el.removeEventListener("scroll", onScroll));
  });

  return isScrolling;
}
