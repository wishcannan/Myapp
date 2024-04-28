<script setup>
// import AudioPlayer from './components/AudioPlayer.vue'


</script>

<template>
  <!-- <div id="nav">
    <router-link to="/">歌单</router-link>
    <router-link to="/Edit">歌单编辑</router-link>
  </div>-->
  <router-view></router-view>
  <!-- <el-affix :offset="0">
    <AudioPlayer />
  </el-affix> -->
  <!-- <Cloud/> -->
  <el-backtop :visibility-height="100" :bottom="60" :right="20">
  </el-backtop>
</template>

<style scoped>

</style>
