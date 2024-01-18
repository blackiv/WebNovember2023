import errorDialog from "./error-dialog.js";
import editDialog from "./edit-contact-dialog.js";
import confirmDialog from "./confirm-dialog.js";
import vueApp from "./vue-app.js";

Vue.createApp(vueApp)
    .component("modalDeleteConfirm", confirmDialog)
    .component("modalAddOrEditDialog", editDialog)
    .component("modalErrorDialog", errorDialog)
    .mount("#app");