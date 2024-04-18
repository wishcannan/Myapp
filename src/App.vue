<script setup>
import Cloud from './components/Cloud.vue'
import AudioPlayer from './components/AudioPlayer.vue';
</script>

<template>
  <el-affix :offset="0">
    <AudioPlayer />
  </el-affix>
  <Cloud msg="Cloud + 1111"/>
  <el-backtop :visibility-height="100" :bottom="60" :right="20">
  </el-backtop>
</template>

<style scoped>

</style>
