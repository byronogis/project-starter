<script setup lang="ts">
import type { FilePondOptions, ProcessServerConfigFunction } from 'filepond'

// Import FilePond plugins (Please note that you need to install these plugins separately)
import FilePondPluginFileRename from 'filepond-plugin-file-rename'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import vueFilePond from 'vue-filepond'

// Import styles
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

interface Props {
  /**
   * The name of the file input field
   */
  name?: string
  /**
   * Callback function to process the file on the server
   * @see https://pqina.nl/filepond/docs/api/server/#process-1
   */
  serverProcessCallback?: PrimoFormFieldFileUploadProcess
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  name: 'file',
  serverProcessCallback: () => async (cxt: Parameters<ProcessServerConfigFunction>) => {
    cxt[5](true, 100, 100)
    const url = URL.createObjectURL(cxt[1])
    return { url }
  },
})

const emits = defineEmits<{
  done: [res: Awaited<ReturnType<PrimoFormFieldFileUploadProcess>>]
}>()

const uploaderLogger = Utils.logger.withTag('Uploader')

/**
 * 上传状态
 */
const uploadsCount = ref(0)
const isUploading = computed(() => uploadsCount.value > 0)

const filePondProps = ref<FilePondOptions>({
  allowMultiple: false,
  acceptedFileTypes: ['image/*'],
  // required: true,
  // disabled: true,
  storeAsFile: true,
  // dropValidation: true,
  files: [
    // ...
  ],
  server: {
    process(fieldName, file, metadata, load, error, progress, abort, transfer, options) {
      uploaderLogger.withTag('Process Arguments').log({ fieldName, file, metadata, load, error, progress, abort, transfer, options })

      const controller = new AbortController()

      uploadsCount.value += 1

      props.serverProcessCallback(
        [fieldName, file, metadata, load, error, progress, abort, transfer, options],
        {
          signal: controller.signal,
        },
      ).then((res) => {
        uploaderLogger.success(res)
        load(res)
        emits('done', res)
      }).catch((err) => {
        uploaderLogger.error(err)
        error('error')
      }).finally(() => {
        uploadsCount.value -= 1
      })

      return {
        abort() {
          controller.abort()
          abort()
        },
      }
    },
  },
  instantUpload: false,
  fileRenameFunction: (file) => {
    return `${file.basename}${file.extension}`
  },
  ...useAttrs(),
})

/**
 * component
 */
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileRename,
)
const pondRef = ref()

/*
function handleAddfile(...rest: any) {
  console.log(rest)

  console.log(pondRef.value.getFiles())
}
@addfile="handleAddfile"
 */

/*
function handlePreparefile() {
  //
  console.log('handlePreparefile')
}
@preparefile="handlePreparefile"
 */

defineExpose({
  /**
   * FilePond instance
   */
  filepond: pondRef,
  uploadsCount,
  isUploading,
})
</script>

<template>
  <FilePond
    ref="pondRef"
    v-bind="{
      ...filePondProps,
      ...props,
    }"
  />
</template>

<style scoped lang="postcss"></style>
