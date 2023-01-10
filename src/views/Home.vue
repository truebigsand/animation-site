<script setup>
import AnimationCover from '../components/AnimationCover.vue'

import { ref } from 'vue'
import { NGrid, NGi, NInputGroup, NInput, NButton, NList, NListItem, NThing, NPopover, NAvatar, useNotification } from 'naive-ui'

const ids = ref((function () { let l = []; for (let i = 1; i <= 20; i++) { l.push(i.toString()) }; return l })())

const notification = useNotification()

const search_value = ref('')
const search_result = ref({})
const search = () => {
	notification.info({
		title: '加载中',
		content: search_value.value,
		duration: 1000
	})
	fetch('https://api.truebigsand.top/cors_anywhere?url=http://103.91.210.141:2515/xgapp.php/v2/search?text=' + search_value.value)
		.then(resp => resp.json())
		.then(json => {
			search_result.value = json
			console.log(search_result.value['data'])
			for (let ani of search_result.value['data']) {
				ani['vod_pic'] = 'https://api.truebigsand.top/cors_anywhere?url=' + ani['vod_pic']
				if (ani['vod_remarks'] == '') {
					ani['vod_remarks'] = '已完结'
				}
			}
			console.log(search_result.value)
			notification.success({
				title: '加载成功',
				content: search_value.value,
				duration: 1000
			})
		})
}
</script>

<template>
	<n-input-group>
		<n-input v-model:value="search_value" placeholder="在这里输入想看的动画" />
		<n-button type="primary" @click="search">
			搜索
		</n-button>
	</n-input-group>
	<n-list hoverable clickable>
		<template #header>
			含有“{{ search_value }}”的番，共{{ search_result['total'] }}部
		</template>
		<n-list-item v-for="animation_info in search_result['data']">
			<a :href="'/#/animation/' + animation_info['vod_id']">
				<n-thing>
					<template #header>
						{{ animation_info['vod_name'] }}
					</template>
					<template #avatar>
						<n-popover trigger="hover">
							<template #trigger>
								<n-avatar :src="animation_info['vod_pic']" />
							</template>
							<img width="300" :src="animation_info['vod_pic']" />
						</n-popover>
					</template>
					<template #description>
						{{ animation_info['vod_remarks'] }}
					</template>
				</n-thing>
			</a>
		</n-list-item>
	</n-list>
</template>

<style scoped>

</style>
