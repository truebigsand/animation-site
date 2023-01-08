<script setup>
import { ref, onMounted, onActivated } from 'vue'
import Dplayer from 'dplayer'

const props = defineProps({
    title: String,
    video_url: String,
    thubnail_url: String
})


const videoRef = ref()
// onMounted(() => {
//     window.dplayer = new Dplayer({
//         container: videoRef.value,
//         video: {
//             url: props.video_url,
//             pic: props.thubnail_url
//         }
//     })
//     window.p=props
//     console.log(props)
//     console.log(dplayer)
// })

// setTimeout(()=>{
//     dplayer.video.src = props.video_url
// }, 3000)

</script>

<template>
    <!-- <div ref="videoRef" class="player"></div> -->
    
    <video crossorigin="anonymous" width="1280" height="720" controls>
        <source :src="props.video_url" type="video/mp4" />
    </video>
</template>