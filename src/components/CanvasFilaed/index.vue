<template>
  <div>
    <canvas
      :id="radom"
      :class="{canDraw: 'canvas'}"
      :width="width"
      :height="height"
      :style="{'width': `${width}px`,'height': `${height}px`}"
      @mousedown="canvasDown($event)"
      @touchstart="canvasDown($event)"
    />
  </div>
</template>
<script lang="ts" src="./CanvasFilaed.ts">
</script>
<style lang="scss" scoped>
.canvas {
  cursor: crosshair;
}
</style>
