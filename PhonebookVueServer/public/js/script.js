import errorDialog from "./error-dialog.js";
import editDialog from "./edit-contact-dialog.js";
import confirmDialog from "./confirm-dialog.js";

function executeGet(url, data) {
    return axios.get(url, {
        params: data
    }).then(response => response.data);
}

function executePost(url, data) {
    return axios.post(url, data).then(response => response.data);
}

function executeDelete(url) {
    return axios.delete(url).then(response => response.data);
}

class PhonebookService {
    constructor() {
        this.baseUrl = "/api/contacts";
    }

    getContacts(filteredString) {
        return executeGet(this.baseUrl, {filteredString});
    }

    postContact(contact) {
        return executePost(this.baseUrl, contact);
    }

    deleteContact(contactId) {
        return executeDelete(`${this.baseUrl}/${contactId}`);
    }
}

// noinspection JSUnusedGlobalSymbols
Vue.createApp({
    data() {
        return {
            contacts: [],
            validated: false,
            editDialogTitle: "",
            deletedContact: {phone: ""},
            filteredString: "",
            service: new PhonebookService()
        };
    },
    created() {
        this.refreshTable();
    },
    methods: {
        showAddDialog() {
            this.editDialogTitle = "Добавление контакта";
            this.$refs.addOrEditDialog.newContact();
            this.$refs.addOrEditDialog.show();
        },
        showDeleteDialog(contact) {
            this.deletedContact = contact;
            this.$refs.confirmDeleteDialog.show();
        },
        showEditDialog(contact) {
            this.editDialogTitle = "Редактирование контакта";
            this.$refs.addOrEditDialog.contact = {...contact};
            this.$refs.addOrEditDialog.show();
        },
        refreshTable() {
            this.service.getContacts(this.filterString)
                .then(contacts => this.contacts = contacts)
                .catch(res => this.showError(res.message));
        },
        onEditDialogSave(contact) {
            this.service.postContact(contact).then(
                res => {
                    if (res.success) {
                        this.refreshTable();
                    } else {
                        this.showError(res.message);
                    }
                }
            ).catch(res => this.showError(res.message));

        },
        deleteContact() {
            this.service.deleteContact(this.deletedContact.id).then(res => {
                if (res.success) {
                    this.refreshTable();
                } else {
                    this.showError(res.message);
                }
            }).catch(res => this.showError(res.message));
        },
        showError(message) {
            this.$refs.errorDialog.show(message);
        }
    }
})
    .component("modalDeleteConfirm", confirmDialog)
    .component("modalAddOrEditDialog", editDialog)
    .component("modalErrorDialog", errorDialog)
    .mount("#app");