// Import vue component
import contentComponent from "./content.vue";
import settingsComponent from "./settings.vue";

const pkg = require("../package.json");

const appName = pkg.saysimple.name;

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component(`plugin-${appName}-content`, contentComponent);
  Vue.component(`plugin-${appName}-settings`, settingsComponent);
}

// Create module definition for Vue.use()
const module = {
  install,
};

// To auto-install when vue is found
let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(module);
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
contentComponent.install = install;
settingsComponent.install = install;

// Export component by default
export const name = appName;
export const plugin = {
  name: pkg.name,
  version: pkg.version,
  saysimple: pkg.saysimple,
};
export const ExampleContent = contentComponent;
export const ExampleSettings = settingsComponent;
