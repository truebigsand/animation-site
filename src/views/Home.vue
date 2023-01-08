<script setup>
import AnimationCover from '../components/AnimationCover.vue'

import { ref } from 'vue'
import { NGrid, NGi, } from 'naive-ui'

const ids = ref((function () { let l = []; for (let i = 1; i <= 20; i++) { l.push(i.toString()) }; return l })())
</script>

<template>
	<n-grid x-gap="12" cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen">
		<n-gi v-for="id in ids">
			<AnimationCover :id="id" />
		</n-gi>
	</n-grid>
</template>

<style scoped>

</style>
