<script setup>
import { NSpace, NLayout, NLayoutHeader, NLayoutContent, NNotificationProvider } from 'naive-ui'
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
	<n-notification-provider>
		<n-space vertical size="large">
			<n-layout>
				<n-layout-header>
					<Header />
				</n-layout-header>
				<n-layout-content content-style="margin: 40px;">
					<RouterView />
				</n-layout-content>
			</n-layout>
		</n-space>
	</n-notification-provider>
</template>