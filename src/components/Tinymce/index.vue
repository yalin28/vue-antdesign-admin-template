<template>
  <div :class="{ fullscreen: fullscreen }" class="tinymce-container" :style="{ width: containerWidth }">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <editor-image color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div>
  </div>
</template>

<script>
import editorImage from "./components/EditorImage.vue";
import plugins from "./plugins";
import toolbar from "./toolbar";
import load from "./dynamicLoadScript";
import { message } from "ant-design-vue";

const tinymceCDN = "https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js";

export default {
  name: "Tinymce",
  components: { editorImage },
  props: {
    id: {
      type: String,
      default: () => "vue-tinymce-" + Date.now() + Math.floor(Math.random() * 1000),
    },
    modelValue: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    toolbar: {
      type: Array,
      default: () => [],
    },
    menubar: {
      type: String,
      default: "file edit insert view format table",
    },
    height: {
      type: [Number, String],
      default: 360,
    },
    width: {
      type: [Number, String],
      default: "auto",
    },
  },
  emits: ["update:modelValue", "input", "change"],
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        en: "en",
        zh: "zh_CN",
        es: "es_MX",
        ja: "ja",
      },
    };
  },
  computed: {
    currentVal() {
      return this.modelValue || this.value || "";
    },
    containerWidth() {
      const width = this.width;
      if (/^[\d]+(\.[\d]+)?$/.test(width)) {
        return `${width}px`;
      }
      return width;
    },
  },
  watch: {
    modelValue(val) {
      if (!this.hasChange && this.hasInit && window.tinymce) {
        this.$nextTick(() => {
          const editor = window.tinymce.get(this.tinymceId);
          if (editor) editor.setContent(val || "");
        });
      }
    },
    value(val) {
      if (!this.hasChange && this.hasInit && window.tinymce) {
        this.$nextTick(() => {
          const editor = window.tinymce.get(this.tinymceId);
          if (editor) editor.setContent(val || "");
        });
      }
    },
  },
  mounted() {
    this.init();
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce();
    }
  },
  deactivated() {
    this.destroyTinymce();
  },
  beforeUnmount() {
    this.destroyTinymce();
  },
  methods: {
    init() {
      load(tinymceCDN, (err) => {
        if (err) {
          message.error(err.message);
          return;
        }
        this.initTinymce();
      });
    },
    initTinymce() {
      const _this = this;
      if (!window.tinymce) return;

      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.languageTypeList["zh"],
        height: this.height,
        body_class: "panel-body ",
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: "clean",
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: "square",
        advlist_number_styles: "default",
        imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
        default_link_target: "_blank",
        link_title: false,
        nonbreaking_force_tab: true,
        init_instance_callback: (editor) => {
          if (_this.currentVal) {
            editor.setContent(_this.currentVal);
          }
          _this.hasInit = true;
          editor.on("NodeChange Change KeyUp SetContent", () => {
            this.hasChange = true;
            const content = editor.getContent();
            this.$emit("update:modelValue", content);
            this.$emit("input", content);
            this.$emit("change", content);
          });
          const targetEl = document.getElementById(this.tinymceId);
          if (targetEl) targetEl.style.display = "block";
        },
        setup(editor) {
          editor.on("FullscreenStateChanged", (e) => {
            _this.fullscreen = e.state;
          });
        },
      });
    },
    destroyTinymce() {
      if (window.tinymce) {
        const tinymceInstance = window.tinymce.get(this.tinymceId);
        if (this.fullscreen && tinymceInstance) {
          tinymceInstance.execCommand("mceFullScreen");
        }
        if (tinymceInstance) {
          tinymceInstance.destroy();
        }
      }
    },
    setContent(value) {
      if (window.tinymce) {
        const editor = window.tinymce.get(this.tinymceId);
        if (editor) editor.setContent(value);
      }
    },
    getContent() {
      if (window.tinymce) {
        const editor = window.tinymce.get(this.tinymceId);
        return editor ? editor.getContent() : "";
      }
      return "";
    },
    imageSuccessCBK(arr) {
      const _this = this;
      if (!window.tinymce) return;
      arr.forEach((v) => {
        let src = v.url || v.response?.files?.file;
        const editor = window.tinymce.get(_this.tinymceId);
        if (editor && src) {
          editor.insertContent(`<img class="wscnph" src="${src}" >`);
        }
      });
    },
  },
};
</script>

<style lang="less">
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
.editor-upload-btn button {
  font-size: 12px !important;
}
</style>
