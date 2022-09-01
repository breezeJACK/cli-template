<template>
  <div>
    <div>home</div>
    <a-button type="primary">asdas</a-button>
    <a-input placeholder="Basic usage" />
    <Svg-icon type="back" />
    <a-datePicker v-model="value1" />
    <a-radio-group v-model="value1">
      <a-radio :value="1">Option A</a-radio>
      <a-radio :value="2">Option B</a-radio>
      <a-radio :value="3">Option C</a-radio>
      <a-radio :value="4">
        More...
        <a-input style="width: 100px; margin-left: 10px" />
      </a-radio>
      {{ value2 }}
    </a-radio-group>
  </div>
</template>

<script lang="ts" setup>
import Select from '@/views/Demo/index';
import type { Dayjs } from 'dayjs';
const value1 = ref<Dayjs>();
const value2 = ref('1');
</script>
