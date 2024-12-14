<script setup lang="ts">
definePageMeta({
  layout: 'primo-primary',
})

const chartData = ref()
const chartOptions = ref()

onMounted(() => {
  chartData.value = setChartData()
})

function setChartData() {
  return {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Sales',
        data: [540, 325, 702, 620],
        // backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246, 0.2)'],
        // borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
        borderWidth: 1,
      },
    ],
  }
}
</script>

<template>
  <div id="page-chart" class="grid grid-cols-12 gap-8">
    <PrimoChart
      v-for="i in (['pie', 'bar', 'line', 'polarArea', 'radar'] as PrimoChartType[])"
      :key="i"
      :type="i "
      :data="chartData"
      :options="chartOptions"
      class="col-span-12 h-80 2xl:col-span-4 xl:col-span-6"
    />
  </div>
</template>

<style scoped lang="postcss"></style>
