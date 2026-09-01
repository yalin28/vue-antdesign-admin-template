<template>
  <component :is="resolvedIcon" v-if="resolvedIcon" :style="style" class="anticon" />
</template>

<script setup>
import { computed, h } from "vue";
import * as icons from "@ant-design/icons-vue";

const props = defineProps({
  type: {
    type: [String, Object, Function],
    default: "",
  },
  component: {
    type: [Object, Function],
    default: null,
  },
  style: {
    type: [Object, String],
    default: () => ({}),
  },
});

function toPascalCase(str) {
  if (!str) return "";
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

const resolvedIcon = computed(() => {
  if (props.component) {
    return props.component;
  }
  if (!props.type) {
    return null;
  }
  if (typeof props.type === "object" || typeof props.type === "function") {
    return props.type;
  }
  
  const rawType = props.type;
  if (icons[rawType]) {
    return icons[rawType];
  }
  
  const pascal = toPascalCase(rawType);
  const possibleNames = [
    pascal,
    pascal + "Outlined",
    pascal + "Filled",
    pascal + "TwoTone",
  ];
  
  for (const name of possibleNames) {
    if (icons[name]) {
      return icons[name];
    }
  }
  
  return null;
});
</script>
