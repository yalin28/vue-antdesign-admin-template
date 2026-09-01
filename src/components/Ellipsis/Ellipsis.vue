<template>
  <a-tooltip v-if="tooltip && isCut" :title="text">
    <span>{{ displayText }}</span>
  </a-tooltip>
  <span v-else>{{ displayText }}</span>
</template>

<script setup>
import { computed, useSlots } from "vue";
import { cutStrByFullLength, getStrFullLength } from "@/components/_util/util";

const props = defineProps({
  length: {
    type: Number,
    required: true,
  },
  tooltip: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots();

const text = computed(() => {
  const defaultSlot = slots.default?.();
  if (!defaultSlot || !defaultSlot[0]) return "";
  return String(defaultSlot[0].children || "");
});

const fullLength = computed(() => getStrFullLength(text.value));
const isCut = computed(() => fullLength.value > props.length);

const displayText = computed(() => {
  if (isCut.value) {
    return cutStrByFullLength(text.value, props.length) + "...";
  }
  return text.value;
});
</script>
