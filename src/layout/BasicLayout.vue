<template>
  <a-layout class="h-full">
    <Header />
    <a-layout>
      <a-layout-sider :width="220" collapsible theme="light">
        <a-menu
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          @click="handleClick"
        >
          <a-sub-menu key="sub1">
            <template #icon>
              <VideoCameraOutlined />
            </template>
            <template #title>列表菜单</template>
            <a-menu-item key="9">Option 9</a-menu-item>
            <a-menu-item key="10">Option 10</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout-content
        :style="{ margin: '20px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <Suspense>
          <template #default>
            <a-config-provider :locale="zhCN">
              <router-view v-slot="{ Component, route }">
                <keep-alive>
                  <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
                </keep-alive>
              </router-view>
            </a-config-provider>
          </template>
          <template #fallback> Loading... </template>
        </Suspense>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { Suspense } from 'vue'
import {
  VideoCameraOutlined,
} from '@ant-design/icons-vue';
import Header from './components/Header.vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
const openKeys = ref<string[]>(['sub1'])
const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)
const handleClick = (e: HTMLElement) => {
  console.log(e)
}
</script>
