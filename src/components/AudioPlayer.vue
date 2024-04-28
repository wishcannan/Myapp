<script setup>
import redbeans from '../assets/Red_beans.mp3';

const redbean = redbeans
</script>
<template>
    <audio controls >
        <source :src=redbean type="audio/mpeg" />
    </audio>
</template>

