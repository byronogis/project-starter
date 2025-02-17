<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'

const { isDark } = useBasicColorMode()

const primoStore = usePrimoStore()!

const menuModeOptions = ref<{
  label: string
  value: PrimoMenuMode
}[]>([
  { label: 'Static', value: 'static' },
  { label: 'Overlay', value: 'overlay' },
])

const model: MenuItem[] = [
  {
    label: 'Primary',
    items: [{
      _value: PrimoPrimaryColorListCST,
      _cate: 'primary',
    }],
  },
  {
    label: 'Surface',
    items: [{
      _value: PrimoSurfaceListCST,
      _cate: 'surface',
    }],
  },
  {
    label: 'Presets',
    items: [{
      _value: PrimoThemePresetsCST,
      _cate: 'preset',
    }],
  },
  {
    label: 'Menu Mode',
    items: [{
      _value: menuModeOptions,
      _cate: 'menumode',
    }],
  },
]

function isOutlinePrimary(name: PrimoPrimaryColorName | PrimoSurfaceName, cate: 'primary' | 'surface') {
  let flag = false

  switch (cate) {
    case 'primary':
      flag = primoStore.config.primary === name
      break
    case 'surface':
      flag = primoStore.config.surface
        ? primoStore.config.surface === name
        : isDark
          ? name === 'zinc'
          : name === 'slate'
      break
    default:
      break
  }

  return flag
}

function handleColorChange(name: PrimoPrimaryColorName | PrimoSurfaceName, cate: 'primary' | 'surface') {
  switch (cate) {
    case 'primary':
      primoStore.config.primary = name as PrimoPrimaryColorName
      break
    case 'surface':
      primoStore.config.surface = name as PrimoSurfaceName
      break
    default:
      break
  }
}
</script>

<template>
  <PrimeMenu
    :model
    :pt="{
      root: 'w-56 border-0',
      list: 'p-0',
      submenuLabel: 'pl-0',
      itemContent: 'bg-transparent',
    }"
  >
    <template #item="{ item: { _cate, _value } }">
      <template v-if="['primary', 'surface'].includes(_cate)">
        <div class="grid gap-2 grid-wrap-1.25rem">
          <PrimeButton
            v-for="i in _value"
            :key="i.name"
            :title="i.name"
            data-allow-mismatch
            class="h-5 w-5 rounded-full border-none p-0 outline-transparent outline-offset-1 outline-solid"
            :class="[{ '!outline-primary': isOutlinePrimary(i.name, _cate) }]"
            :style="{ backgroundColor: `${i.name === 'noir' ? 'var(--text-color)' : i.palette['500']}` }"
            @click="handleColorChange(i.name, _cate)"
          />
        </div>
      </template>

      <template v-else-if="_cate === 'preset'">
        <PrimeSelectButton
          v-model="primoStore.config.preset"
          :pt="{ root: 'grid grid-wrap-6.25rem' }"
          :options="Object.keys(PrimoThemePresetsCST)"
          :allow-empty="false"
        />
      </template>

      <template v-else-if="_cate === 'menumode'">
        <PrimeSelectButton
          v-model="primoStore.config.menuMode"
          :pt="{ root: 'grid grid-wrap-6.25rem' }"
          :options="menuModeOptions"
          :allow-empty="false"
          option-label="label"
          option-value="value"
        />
      </template>
    </template>
  </PrimeMenu>
</template>
