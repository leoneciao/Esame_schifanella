<script setup>
import { computed } from 'vue'

const props = defineProps({
  event: { type: Object, required: true },
  large: { type: Boolean, default: false }
})

const imageSrc = computed(() => {
  const image = props.event.image
  if (!image) return ''
  if (/^(https?:|data:|blob:|\/)/.test(image)) return image
  return `/img/${image}`
})

const patternClass = computed(() => {
  const known = ['musica', 'teatro', 'podcast']
  return known.includes(props.event.category) ? `pattern-${props.event.category}` : 'pattern-default'
})
</script>

<template>
  <div class="event-visual" :class="[{ 'event-visual-lg': large }, !event.image ? patternClass : '']">
    <img
      v-if="event.image"
      :src="imageSrc"
      :alt="`Immagine dell'evento ${event.title}`"
      class="img-fluid"
      :style="{ objectPosition: event.imagePosition || 'center' }"
    />
    <span v-else class="event-visual-label display-font">{{ event.category }}</span>
  </div>
</template>
