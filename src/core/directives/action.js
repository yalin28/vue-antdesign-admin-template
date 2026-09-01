import store from "@/store";

export const actionDirective = {
  mounted(el, binding, vnode) {
    const actionName = binding.arg;
    const roles = store.getters.roles;
    const elVal = vnode.props?.permission || vnode.ctx?.root?.meta?.permission;
    const permissionId = Array.isArray(elVal) ? elVal : (elVal ? [elVal] : []);
    
    if (roles && roles.permissions) {
      roles.permissions.forEach((p) => {
        if (permissionId.length > 0 && !permissionId.includes(p.permissionId)) {
          return;
        }
        if (p.actionList && !p.actionList.includes(actionName)) {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          } else {
            el.style.display = "none";
          }
        }
      });
    }
  },
};

export default actionDirective;
