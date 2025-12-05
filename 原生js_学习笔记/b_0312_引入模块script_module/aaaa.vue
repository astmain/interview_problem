<template>
  <div>
    <k-form-build :value="jsonData" ref="KFB" @submit="handleSubmit" />
    <button @click="getData">提交</button>
  </div>
</template>
<script>
export default {
  name: 'Demo',
  data() {
    return {
      jsonData: {
        "list": [
          {
            "type": "input", "label": "账号",
            "options": {
              "type": "text", "width": "100%", "defaultValue": "", "placeholder": "请输入",
              "clearable": false, "maxLength": null, "addonBefore": "", "addonAfter": "", "hidden": false, "disabled": false
            },
            "model": "input_1651475369342", "key": "input_1651475369342", "help": "",
            "rules": [{ "required": false, "message": "必填项" }]
          },

          {
            "type": "textarea", "label": "密码", "options": {
              "width": "100%", "minRows": 4, "maxRows": 6,
              "maxLength": null, "defaultValue": "", "clearable": false, "hidden": false, "disabled": false, "placeholder": "请输入"
            },
            "model": "textarea_1651475371559", "key": "textarea_1651475371559", "help": "",
            "rules": [{ "required": false, "message": "必填项" }]
          },
          {
            "type": "checkbox", "label": "多选框",
            "options": {
              "disabled": false, "hidden": false, "defaultValue": [], "dynamicKey": "", "dynamic": false,
              "options": [{ "value": "1", "label": "js" }, { "value": "2", "label": "css" }, { "value": "3", "label": "html" }]
            },
            "model": "checkbox_1651475373161", "key": "checkbox_1651475373161", "help": "",
            "rules": [{ "required": false, "message": "必填项" }]
          },
          {
            "type": "button", "label": "按钮",
            "options": { "type": "dashed", "handle": "dynamic", "dynamicFun": "", "hidden": false, "disabled": false },
            "key": "button_1651475429635"
          }],
        "config": {
          "layout": "horizontal",
          "labelCol": { "xs": 4, "sm": 4, "md": 4, "lg": 4, "xl": 4, "xxl": 4 },
          "labelWidth": 100, "labelLayout": "Grid",
          "wrapperCol": { "xs": 18, "sm": 18, "md": 18, "lg": 18, "xl": 18, "xxl": 18 },
          "hideRequiredMark": false,
          "customStyle": ""
        }
      }
    }
  },
  methods: {
    handleSubmit(p) {
      // 通过表单提交按钮触发，获取promise对象
      p().then(res => {
        // 获取数据成功
        alert(JSON.stringify(res))
      })
        .catch(err => {
          console.log(err, '校验失败')
        })
    },
    getData() {
      // 通过函数获取数据
      this.$refs.KFB.getData().then(res => {
        // 获取数据成功
        alert(JSON.stringify(res))
      })
        .catch(err => {
          console.log(err, '校验失败')
        })
    }
  }
}
</script>