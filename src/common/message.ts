import { ElMessageBox } from "element-plus";
import { h } from "vue";
export const boxAlert = (message: string, title = "") => {
  ElMessageBox({
    title,
    message: h("p", null, [h("i", { style: "color: red" }, message)]),
    showClose: false,
  });
};
