import { type Ref, ref, onMounted } from "vue";

// Tracks the given element ref's scroll state reactively
export default function useIsScrolling(
  elementRef: Ref<HTMLElement | null>,
  waitThreshold: number = 10
) {
  const isScrolling = ref<boolean>(false);

  onMounted(() => {
    const el = elementRef.value!;

    let timer: number = -1;

    // FIXME: removeEventListener
    el.addEventListener(
      "scroll",
      () => {
        // user is scrolling
        if (timer !== -1) {
          clearTimeout(timer);
          isScrolling.value = true;
        }

        // scrolling has ended
        // @ts-expect-error
        timer = setTimeout(() => (isScrolling.value = false), waitThreshold);
      },
      false
    );
  });

  return isScrolling;
}
