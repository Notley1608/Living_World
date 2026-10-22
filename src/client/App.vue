<script setup lang="ts">
import { ref } from 'vue';
import type { ServerMsg } from '@shared';

const tick = ref(0);
const ws = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws`);
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data) as ServerMsg;
  if (msg.type === 'snapshot') tick.value = msg.data.tick;
};
</script>

<template>
  <main>
    <h1>Living World</h1>
    <p>Tick: {{ tick }}</p>
  </main>
</template>
