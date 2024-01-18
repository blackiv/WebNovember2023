import {PhonebookService} from "./PhonebookService.js";

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
}