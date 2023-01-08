<script setup>
import { ref, onMounted } from 'vue'
import { NGrid, NGi, NSpace, NLayout, NLayoutHeader, NLayoutContent, NPageHeader, NDivider, NInputGroup, NInput, NButton, NStatistic, NBreadcrumb, NBreadcrumbItem, NAvatar, NImage, NPopover, NPagination } from 'naive-ui'
import { useRoute } from 'vue-router';
import Dplayer from 'dplayer'

const route = useRoute()
const id = route.params.id

const now_page = ref([])
const animation_info = ref({})

const videoRef = ref()

onMounted(async () => {
    window.dplayer = new Dplayer({
        container: videoRef.value,
		video: {

		}
    })
	var base_api_url = 'https://api.truebigsand.top/cors_anywhere?url=http://103.91.210.141:2515/xgapp.php/v2/video_detail?id='
	await fetch(base_api_url + id)
		.then((resp) => resp.json())
		.then((json) => {
			let vod_info = json['data']['vod_info']
			let info = {}
			// 标题
			info.name = vod_info['vod_name']
			// 点击量
			info.hits = vod_info['vod_hits']
			// 年份
			info.year = vod_info['vod_year']
			// 评分
			info.score = vod_info['vod_score']
			// 导演
			info.director = vod_info['vod_director']
			// 简介
			info.description = vod_info['vod_content']
			// 封面
			info.picture = 'https://api.truebigsand.top/cors_anywhere?url=' + vod_info['vod_pic']
			// Tag
			let tag_str = vod_info['vod_class']
			let tag = []
			tag_str.replace(' ', '')
			if (tag_str.includes(',')) {
				tag = tag_str.split(',')
			} else if (tag_str.includes('/')) {
				tag = tag_str.split('/')
			} else {
				tag = [tag_str]
			}
			info.tag = tag
			// 正片
			let source = vod_info['vod_url_with_player']
			let parse_api = 'https://api.truebigsand.top/cors_anywhere?url=http://103.91.210.141:6100/jx.php?url='
			info.source = source.map(play_info => {
				return {
					'name': play_info['name'],
					'play_info': play_info['url'].split('#').map(ep => {
						let l = ep.split('$')
						return {
							'ep': l[0],
							'api': parse_api + l[1]
						}
					})
				}
			})
			info.episodes = Math.max(...info.source.map(item => item['play_info'].length))
			animation_info.value = info
			console.log(info)
			console.log(vod_info)
			updateVideo(1)
		})
})

const now_playing = ref({})
function updateVideo(index) {
	if (now_page.value.length != 0) {
		let source = animation_info.value.source[index]
		now_playing.value['name'] = source.name + ' 第' + now_page.value[index] + '集'
		fetch(source.play_info[now_page.value[index] - 1].api)
			.then(resp => resp.json())
			.then(json => {
				dplayer.video.src = now_playing.value['url'] = json['url']
			})
	} else {
		let source = animation_info.value.source[index]
		now_playing.value['name'] = source.name + ' ' + 1
		fetch(source.play_info[0].api)
			.then(resp => resp.json())
			.then(json => {
				dplayer.video.src = now_playing.value['url'] = json['url']
			})
	}
}

</script>

<template>
	<n-page-header>
		<n-grid :cols="5">
			<n-gi>
				<n-statistic label="正片" :value="animation_info.episodes + ' 集'" />
			</n-gi>
			<n-gi>
				<n-statistic label="导演" :value="animation_info.director" />
			</n-gi>
			<n-gi>
				<n-statistic label="点击量" :value="animation_info.hits + ' 次'" />
			</n-gi>
			<n-gi>
				<n-statistic label="评分" :value="animation_info.score" />
			</n-gi>
			<n-gi>
				<n-statistic label="年份" :value="animation_info.year" />
			</n-gi>
		</n-grid>
		<template #title>
			{{ animation_info.name }}
		</template>
		<template #header>
			<n-breadcrumb>
				<n-breadcrumb-item v-for="tag in animation_info.tag">{{ tag }}</n-breadcrumb-item>
			</n-breadcrumb>
		</template>
		<template #avatar>
			<n-popover trigger="hover">
				<template #trigger>
					<n-avatar :src="animation_info.picture" />
				</template>
				<img :src="animation_info.picture" />
			</n-popover>
		</template>
		<template #footer>
			{{ animation_info.description }}
		</template>
	</n-page-header>
	<p>{{ now_playing.name }}</p>
	<div ref="videoRef" class="player"></div>
	<!-- <VideoPlayer :title="now_playing.name" :video_url="now_playing.url" :thubnail_url="animation_info.picture" /> -->
	<template v-for="source, index in animation_info.source">
		<n-divider title-placement="left">
			{{ source.name }}
		</n-divider>
		<n-pagination v-model:page="now_page[index]" :page-count="source.play_info.length"
			@update:page="updateVideo(index)" />
	</template>
</template>

<style scoped>

</style>
