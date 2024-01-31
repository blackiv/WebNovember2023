import {PhonebookService} from "./phonebook-service.js";

export default {
    data() {
        return {
            contacts: [],
            validated: false,
            editDialogTitle: "",
            deletedContact: {phone: ""},
            filterString: "",
            service: new PhonebookService()
        };
    },

    created() {
        this.loadContacts();
    },

    methods: {
        showAddDialog() {
            this.editDialogTitle = "Добавление контакта";
            this.$refs.addOrEditDialog.show();
        },

        showDeleteDialog(contact) {
            this.deletedContact = contact;
            this.$refs.confirmDeleteDialog.show();
        },

        showEditDialog(contact) {
            this.editDialogTitle = "Редактирование контакта";
            this.$refs.addOrEditDialog.show({...contact});
        },

        loadContacts() {
            this.service.getContacts(this.filterString)
                .then(contacts => this.contacts = contacts)
                .catch(error => this.showError(error.message));
        },

        onEditDialogSave(contact) {
            this.service.postContact(contact).then(res => {
                    if (res.success) {
                        this.$refs.addOrEditDialog.hide();
                        this.loadContacts();
                    } else {
                        this.showError(res.message);
                    }
                }
            ).catch(error => this.showError(error.message));
        },

        onConfirmDeleteDialog() {
            this.service.deleteContact(this.deletedContact.id).then(res => {
                if (res.success) {
                    this.$refs.confirmDeleteDialog.hide();
                    this.loadContacts();
                } else {
                    this.showError(res.message);
                }
            }).catch(error => this.showError(error.message));
        },

        showError(message) {
            this.$refs.errorDialog.show(message);
        }
    }
}