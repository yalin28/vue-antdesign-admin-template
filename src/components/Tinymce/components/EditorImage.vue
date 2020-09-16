<template>
  <div class="upload-container">
    <a-button :style="{ background: color, borderColor: color }" icon="cloud-upload" size="small" type="primary" @click="dialogVisible = true"
      >上传图片</a-button
    >
    <a-modal :visible.sync="dialogVisible" title="上传图片" @cancel="handleDialogCancel" @ok="handleDialogOk">
      <a-upload
        class="editor-slide-upload"
        list-type="picture-card"
        :multiple="true"
        :fileList="fileList"
        :action="upLoadImgUrl"
        @change="handleChange"
        @preview="handlePreview"
      >
        <div v-if="fileList.length < 8">
          <a-icon type="plus" />
          <div class="ant-upload-text">点击上传</div>
        </div>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-upload>
    </a-modal>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff',
    },
  },
  data() {
    return {
      previewVisible: false,
      dialogVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ],
      upLoadImgUrl: process.env.VUE_APP_BASE_API_UPLOAD,
    }
  },
  methods: {
    init() {
      this.fileList = []
      this.imgList = {}
    },
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    },
    handleDialogCancel() {
      this.dialogVisible = false
      this.init()
    },
    handleDialogOk() {
      this.dialogVisible = false
      if (this.fileList.length > 0) {
        this.$emit('successCBK', this.fileList)
      }
      this.init()
    },
  },
}
</script>

<style lang="less" scoped></style>
