<template>
  <DefaultTheme.Layout>
    <template #layout-top>
      <ReadingProgress />
    </template>
    <template #layout-bottom>
      <SidebarToggle />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import ReadingProgress from './ReadingProgress.vue'
import SidebarToggle from './SidebarToggle.vue'
</script>
