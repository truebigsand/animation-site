<script setup>
import { NPageHeader, NDivider, NInputGroup, NInput, NButton, NAvatar } from 'naive-ui'
</script>

<template>
    <n-page-header style="margin: 10px; padding-top: 10px;">
        <template #avatar>
            <n-avatar src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg" />
        </template>
        <template #title>
            <a href="/">AnimationSite</a>
        </template>
        <template #subtitle>
            看番的地方
        </template>
        <template #extra>
            
        </template>
        <n-divider />
    </n-page-header>
</template>