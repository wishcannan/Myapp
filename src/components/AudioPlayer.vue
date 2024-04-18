<script setup>
import redbeans from '../assets/Red_beans.mp3';
</script>
<script>
export default {
    data(){
        return{
            redbean:redbeans,
        }
    }
}
</script>
<template>
    <!-- <el-button type="primary">Offset top 120px</el-button> -->
    <audio controls >
        <source :src=redbean type="audio/mpeg" />
    </audio>
</template>

