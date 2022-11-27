<script setup lang="ts">
import { appWindow, LogicalSize, PhysicalSize } from "@tauri-apps/api/window";

appWindow.setTitle('Калькулятор')
appWindow.setIcon("D:/egor/Site/Learn/calculator/src/assets/logo.png")
appWindow.setMinSize(new PhysicalSize(320, 500))
appWindow.setSize(new LogicalSize(600, 500))
</script>

<template>
	<div class="container">calculator</div>
</template>

<style lang="scss">
@import '@/assets/style.scss';
</style>