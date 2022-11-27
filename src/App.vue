<script setup lang="ts">
import { appWindow, LogicalSize, PhysicalSize } from "@tauri-apps/api/window";
import { sendNotification } from '@tauri-apps/api/notification';
import TopSection from '@/components/TopSection.vue'
import ButtonsSection from '@/components/ButtonsSection.vue'

appWindow.setTitle('Калькулятор')
appWindow.setIcon("./assets/logo.png")
appWindow.setMinSize(new PhysicalSize(320, 500))
appWindow.setSize(new LogicalSize(600, 500))
</script>

<template>
	<div class="main-container">
		<TopSection />
		<ButtonsSection />
	</div>
</template>

<style lang="scss">
@import '@/assets/style.scss';
@import '@/assets/fonts.css';

.main-container {
	display: grid;
	height: 100%;
	grid-template-rows: 1fr 3fr;
	gap: rem(10);
}
</style>