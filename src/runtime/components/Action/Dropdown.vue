<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/vue";
import { onClickOutside } from "@vueuse/core";

interface Props {
  options: [];
  isScrolling?: boolean;
}

// component definition
const props = withDefaults(defineProps<Props>(), { isScrolling: false });

// dropdown state
const toggle = ref<boolean>(false);

// set toggle to false whenever the parent wrapper is scrolled
watch(
  () => props.isScrolling,
  (scrolling) => {
    if (scrolling) {
      toggle.value = false;
    }
  }
);

// element refs
const trigger = ref<HTMLButtonElement>();
const dropdown = ref<HTMLDivElement>();

// anchor positioning
const { floatingStyles } = useFloating(trigger, dropdown, {
  placement: "bottom-start",
  middleware: [
    offset(3.125),
    shift(),
    flip(({ placement }) => {
      // change transform-origin based on placement
      if (placement === "top-start") {
        dropdown.value.style.transformOrigin = "0 100%";
      } else {
        dropdown.value.style.transformOrigin = "0 0";
      }

      return {};
    }),
  ],
  whileElementsMounted: autoUpdate,
  // NOTE: not sure if `fixed` strategy would be better here
  strategy: "absolute",
  transform: false,
});

// set `toggle` to false when clicked outside
onClickOutside(dropdown, () => (toggle.value = false), {
  ignore: [trigger],
});

async function onTriggerClick() {
  toggle.value = !toggle.value;

  // wait for toggle state change to take effect
  await nextTick();

  // focus the dropdown menu
  if (toggle.value === true) {
    dropdown.value.focus();
  }
}
</script>

<!-- animations -->
<script lang="ts">
function enterTransition(el: Element, done: () => void): void {
  const div = el as HTMLDivElement;

  div.addEventListener("transitionend", () => done(), { once: true });

  requestAnimationFrame(() => {
    div.style.scale = "1";
    div.style.opacity = "1";
  });
}

function leaveTransition(el: Element, done: () => void): void {
  const div = el as HTMLDivElement;

  div.addEventListener("transitionend", () => done(), { once: true });

  requestAnimationFrame(() => {
    div.style.scale = "0";
    div.style.opacity = "0";
  });
}
</script>

<template>
  <div :class="$style.wrapper" :tabindex="-1">
    <!-- trigger -->
    <button
      ref="trigger"
      type="button"
      class="__st-action-menu-trigger"
      :class="$style.trigger"
      :tabindex="0"
      @click="onTriggerClick"
    >
      <!-- FIXME: icon -->
      m
    </button>
    <!-- dropdown -->
    <ClientOnly>
      <Teleport to="#teleports">
        <Transition
          :css="false"
          @enter="enterTransition"
          @leave="leaveTransition"
        >
          <div
            v-if="toggle"
            ref="dropdown"
            class="__st-action-menu-dropdown"
            :class="$style.dropdown"
            :tabindex="-1"
            :style="floatingStyles"
          >
            <ul :tabindex="-1">
              <li
                v-for="{ label, action } of options"
                :key="label"
                :tabindex="-1"
              >
                <button type="button" :tabindex="0" @click="action">
                  {{ label }}
                </button>
              </li>
            </ul>
          </div>
        </Transition>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<!-- NOTE: I can't really see the benefit of moving these styles to base.css -->
<!-- since they're only used here and provided as CSS module, I think it's okay -->
<style module>
div.wrapper {
  position: relative;
}

button[type="button"].trigger {
  /* default styles */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  /* styles that come from theme */
  width: var(--st-width);
  height: var(--st-height);
  border-radius: var(--st-border-radius);
  background-color: var(--st-background-color);
  border-width: var(--st-border-width);
  border-style: var(--st-border-style);
  border-color: var(--st-border-color);
  color: var(--st-text-color);
}

button[type="button"].trigger:hover {
  background-color: var(--st-background-color-hover);
}

div.dropdown {
  /* default styles */
  position: relative;
  display: block;
  z-index: 10;
  width: max-content;
  height: auto;
  overflow: hidden;
  outline: none;
  /* animation related */
  transition-property: transform, scale, opacity;
  transition-duration: 150ms;
  transform-origin: 0 0;
  scale: 0;
  opacity: 0;
  /* styles that come from theme */
  font-family: var(--st-font-family);
  background-color: var(--st-background-color);
  border-radius: var(--st-border-radius);
  border-width: var(--st-border-width);
  border-style: var(--st-border-style);
  border-color: var(--st-border-color);
  filter: var(--st-filter);
}

div.dropdown:focus {
  outline: none !important;
}

div.dropdown > ul {
  /* resets */
  all: unset;
  list-style: none;
  padding: 0;
  margin: 0;
  /* styles */
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

div.dropdown > ul > li {
  position: relative;
  display: block;
  text-align: left;
  width: 100%;
  border-bottom: 1px solid rgb(229 231 235);
}

div.dropdown > ul > li:last-child {
  border-bottom: 0;
}

/* FIXME: move some of the styles here to theme CSS file */
div.dropdown > ul > li > button[type="button"] {
  all: unset;
  position: relative;
  cursor: pointer;
  user-select: none;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 400;
  color: rgb(65 83 97);
  display: flex;
  align-items: start;
  justify-content: start;
  border: 0;
  width: 100%;
  background-color: rgb(238 242 245);
  /* padding */
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
}

div.dropdown > ul > li > button[type="button"]:hover {
  background-color: rgb(229 231 235);
}
</style>
