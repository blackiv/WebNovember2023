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
    }
).component("modalDeleteConfirm", {
        template: `
          <div class="modal fade" ref="modalDeleteConfirmationDialog" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5">Подтверждение удаления</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <slot name="description"></slot>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Нет</button>
                <button type="button" class="btn btn-primary" @click="onOk">Да</button>
              </div>
            </div>
          </div>
          </div>`,
        data() {
            return {
                dialog: null
            };
        },
        mounted() {
            this.dialog = new bootstrap.Modal(this.$refs.modalDeleteConfirmationDialog, {});
        },
        methods: {
            show() {
                this.dialog.show();
            },
            onOk() {
                this.dialog.hide();
                this.$emit("ok");
            }
        }
    }
).component("modalAddOrEditDialog", {
    template: `
      <div class="modal fade" ref="modalEditDialog" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">
              <slot name="title"></slot>
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form ref="addForm" class="row row-cols-lg-auto g-3 needs-validation"
                  v-bind:class="{'was-validated' : validated}" novalidate @submit.prevent="save">
              <div class="col-12 col-lg-4">
                <input type="text" class="form-control" placeholder="Фамилия" v-model="contact.family" required>
              </div>
              <div class="col-12 col-lg-4">
                <input type="text" class="form-control" placeholder="Имя" v-model="contact.name" required>
              </div>
              <div class="col-12 col-lg-4">
                <input type="text" class="form-control" placeholder="Телефон" v-model="contact.phone"
                       @input="phoneInput" required>
              </div>
              <button style="display: none" type="submit"></button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
            <button type="button" class="btn btn-primary" @click="save">Сохранить</button>
          </div>
        </div>
      </div>
      </div>`,
    data() {
        return {
            dialog: null,
            contact: {
                family: "",
                name: "",
                phone: "",
                id: 0
            },
            validated: false
        }
    },
    mounted() {
        this.dialog = new bootstrap.Modal(this.$refs.modalEditDialog, {});
    },
    methods: {
        show() {
            this.dialog.show();
        },
        save() {
            if (!this.$refs.addForm.checkValidity()) {
                this.validated = true;
                return;
            }
            this.dialog.hide();
            this.$emit("ok", this.contact);
        },
        phoneInput(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        },
        newContact() {
            this.contact = {
                family: "",
                name: "",
                phone: "",
                id: 0
            };
            this.validated = false;
        }
    }
}).component("modalErrorDialog", {
    template: `
      <div class="modal fade" ref="modalErrorDialog" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content alert-danger">
          <div class="modal-body alert-danger alert mb-0">
            <div class="row justify-content-around mb-4 border-bottom border-danger-subtle">
              <div class="col-11">
                <h1 class="modal-title fs-5">Подтверждение удаления</h1>
              </div>
              <div class="col-1">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </div>
            {{ errorMessage }}
          </div>
        </div>
      </div>
      </div>`,
    data() {
        return {
            errorMessage: ""
        };
    },
    mounted() {
        this.dialog = new bootstrap.Modal(this.$refs.modalErrorDialog, {});
    },
    methods: {
        show(message) {
            this.errorMessage = message;
            this.dialog.show();
        }
    }
}).mount("#app");