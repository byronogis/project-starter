<script setup lang="ts">
const { isDark } = useSharedColorMode()

const primoStore = inject(PrimoStoreInjectionKey)!

const presetsOptions = ref(Object.keys(PrimoThemePresetsCST))

const menuModeOptions = ref<{
  label: string
  value: PrimoSidebarMenuMode
}[]>([
  { label: 'Static', value: 'static' },
  { label: 'Overlay', value: 'overlay' },
])
</script>

<template>
  <div
    class="bg-surface-0 dark:bg-surface-900 config-panel component-primo-configurator rounded-border border-surface absolute right-0 top-[3.25rem] hidden w-64 origin-top border p-4 shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]"
  >
    <div class="flex flex-col gap-4">
      <div>
        <span class="text-muted-color text-sm font-semibold">Primary</span>
        <div class="flex flex-wrap justify-between gap-2 pt-2">
          <button
            v-for="primaryColor of PrimoPrimaryColorListCST"
            :key="primaryColor.name"
            type="button"
            :title="primaryColor.name"
            data-allow-mismatch
            class="h-5 w-5 cursor-pointer rounded-full border-none p-0 outline-transparent outline-offset-1 outline-solid"
            :class="[
              {
                '!outline-primary': primoStore.config.primary === primaryColor.name,
              },
            ]"
            :style="{ backgroundColor: `${primaryColor.name === 'noir' ? 'var(--text-color)' : primaryColor.palette['500']}` }"
            @click="primoStore.config.primary = primaryColor.name"
          />
        </div>
      </div>
      <div>
        <span class="text-muted-color text-sm font-semibold">Surface</span>
        <div class="flex flex-wrap justify-between gap-2 pt-2">
          <button
            v-for="surface of PrimoSurfaceListCST"
            :key="surface.name"
            type="button"
            :title="surface.name"
            data-allow-mismatch
            class="h-5 w-5 cursor-pointer rounded-full border-none p-0 outline-transparent outline-offset-1 outline-solid"
            :class="[
              {
                '!outline-primary': primoStore.config.surface
                  ? primoStore.config.surface === surface.name
                  : isDark
                    ? surface.name === 'zinc'
                    : surface.name === 'slate',
              },
            ]"
            :style="{ backgroundColor: `${surface.palette['500']}` }"
            @click="primoStore.config.surface = surface.name"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-muted-color text-sm font-semibold">Presets</span>
        <SelectButton
          v-model="primoStore.config.preset"
          :options="presetsOptions"
          :allow-empty="false"
        />
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-muted-color text-sm font-semibold">Menu Mode</span>
        <SelectButton
          v-model="primoStore.config.menuMode"
          :options="menuModeOptions"
          :allow-empty="false"
          option-label="label"
          option-value="value"
        />
      </div>
    </div>
  </div>
</template>
