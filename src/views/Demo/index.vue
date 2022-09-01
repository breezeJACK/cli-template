<template>
  <div>
    <a-page-header :breadcrumb="{ routes }" title="Title" sub-title="This is a subtitle" />
    <div>demo</div>
  </div>
</template>

<script lang="ts" setup>
const routes = [
  {
    path: 'index',
    breadcrumbName: '首页'
  },
  {
    path: 'first',
    breadcrumbName: '列表页'
  },
  {
    path: 'second',
    breadcrumbName: 'demo页'
  }
];
</script>
