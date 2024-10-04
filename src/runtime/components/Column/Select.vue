<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";

const dropdownRef = ref<HTMLDivElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const toggle = ref<boolean>(false);

// set `toggle` to false when clicked outside
onClickOutside(dropdownRef, () => (toggle.value = false), {
  ignore: [inputRef],
});

onMounted(() => {
  const input = inputRef.value!;
  // check if input element has focus on mount
  const hasFocus = document.activeElement === input;

  if (hasFocus) {
    toggle.value = true;
  }
});
</script>

<script lang="ts">
function enterTransition(el: Element, done: () => void): void {
  const div = el as HTMLDivElement;

  div.addEventListener("transitionend", done, { once: true });

  div.style.height = "auto";
  div.style.opacity = "0";
  div.style.overflow = "hidden";
  const height = getComputedStyle(div).height;

  div.style.height = "0px";

  getComputedStyle(div).height;

  requestAnimationFrame(() => {
    div.style.height = height;
    div.style.opacity = "1";
  });
}

function afterEnter(el: Element): void {
  const div = el as HTMLDivElement;
  div.style.height = "auto";
  div.style.overflow = "";
}

function leaveTransition(el: Element, done: () => void): void {
  const div = el as HTMLDivElement;

  div.addEventListener("transitionend", done, { once: true });

  div.style.height = "auto";
  div.style.opacity = "1";

  const height = getComputedStyle(div).height;
  div.style.height = height;

  getComputedStyle(div).height;

  requestAnimationFrame(() => {
    div.style.height = "0px";
    div.style.opacity = "0";
  });
}
</script>

<template>
  <div class="filter-wrapper" @focusin="toggle = true">
    <!-- search input -->
    <input ref="inputRef" id="" name="" type="text" />
    <!-- dropdown -->
    <Transition
      @enter="enterTransition"
      @after-enter="afterEnter"
      @leave="leaveTransition"
    >
      <div v-if="toggle" ref="dropdownRef" class="dropdown" :tabindex="-1">
        <ul :tabindex="-1" class="list">
          <template v-for="n in 10" :key="n">
            <li :tabindex="0">hey</li>
          </template>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<!-- FIXME: move to base.css -->
<style scoped>
div.dropdown {
  position: absolute;
  display: block;
  min-width: 100%;
  width: auto;
  max-height: 156px;
  height: auto;
  z-index: 10;
  left: 0;
  top: calc(100% + 6px);
  border: 1px solid var(--tt-border-color);
  box-sizing: border-box;
  white-space: nowrap;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 4px;
  background-color: white;
  transition-property: height, opacity;
  transition-duration: 150ms;
  user-select: none;
  transform: translateZ(0);
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
}

div.dropdown > ul.list {
  all: unset;
  list-style-type: none;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

div.dropdown > ul.list > li {
  all: unset;
  list-style-type: none;
  position: relative;
  display: block;
  box-sizing: border-box;
  background-color: white;
  cursor: pointer;
  border-bottom: 1px var(--tt-input-border-style) var(--tt-input-border-color);
  /* padding */
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  /* text */
  font-size: var(--tt-input-font-size);
  font-weight: var(--tt-input-font-weight);
  color: var(--tt-input-text-color);
}

div.dropdown > ul.list > li:last-child {
  border-bottom: none;
}

div.dropdown > ul.list > li:hover {
  background-color: antiquewhite;
}

div.dropdown > ul.list > li:focus {
  background-color: antiquewhite;
}
</style>
