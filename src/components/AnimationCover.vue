<script setup>
import { NCard, NButton, NEllipsis, NImage } from 'naive-ui'
import { ref } from 'vue';

const props = defineProps({
    id: String,
})

const id = ref(props.id)
const title = ref('')
const content = ref('')
const src = ref('')

!(function () {
    var base_api_url = 'https://api.truebigsand.top/cors_anywhere?url=http://103.91.210.141:2515/xgapp.php/v2/video_detail?id='
    fetch(base_api_url + id.value)
        .then((resp) => resp.json())
        .then((json) => {
            var vod_info = json['data']['vod_info']
            title.value = vod_info['vod_name']
            content.value = vod_info['vod_content'].trim()
            src.value = 'https://api.truebigsand.top/cors_anywhere?url=' + vod_info['vod_pic']
        })
})()

</script>

<template>
    <a :href="'/#/animation/'+id">
    <n-card :title="title" hoverable>
        <template #cover>
            <img :src="src" />
        </template>
        <n-ellipsis line-clamp="2">
            {{ content }}
            <template #tooltip>
                <div class="max-width">{{ content }}</div>
            </template>
        </n-ellipsis>
    </n-card></a>
</template>

<style scoped>
.n-card {
    max-width: 200px;
}
.max-width {
    max-width: 180px;
}
</style>