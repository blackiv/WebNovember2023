Vue.createApp({
        data() {
            return {
                contacts: [],
                validated: false,
                addTitle: "",
                filterString: "",
                deletedContact: {
                    phone: ""
                },
                filteredContacts: null,
                id: 1
            };
        },
        mounted() {
            this.refreshTable();
        },
        methods: {
            add() {
                this.addTitle = "Добавление контакта";
                this.$refs.addOrEditDialog.show();
            },
            confirmDelete(contact) {
                this.deletedContact = contact;
                this.$refs.confirmDeleteDialog.show();
            },
            deleteContact() {
                const removedIndex = this.contacts.findIndex(value => value.id === this.deletedContact.id);
                if (removedIndex !== -1) {
                    this.contacts.splice(removedIndex, 1);
                }
            },
            refreshTable() {
                if (this.filterString === "") {
                    this.filteredContacts = this.contacts;
                } else {
                    this.filteredContacts = this.contacts.filter(value => value.phone.includes(this.filterString) || value.family.includes(this.filterString) || value.name.includes(this.filterString));
                }
            },
            onSave(contact) {
                if (contact.id === 0) {
                    contact.id = this.id;
                    this.id++;
                    this.contacts.push(contact);
                } else
                {
                    const changedIndex = this.contacts.findIndex(value => value.id === contact.id);
                    this.contacts[changedIndex] = contact;
                }
                this.refreshTable();

            },
            editContact(contact) {
                this.addTitle = "Редактирование контакта";
                this.$refs.addOrEditDialog.contact = {...contact};
                this.$refs.addOrEditDialog.show();
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
                <input type="input" class="form-control" placeholder="Телефон" v-model="contact.phone"
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
            /*
            * save
            * */
            this.$emit("ok", this.contact);
            this.clearInputData();
        },
        phoneInput(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        },
        clearInputData() {
            this.contact = {
                family: "",
                name: "",
                phone: "",
                id: 0
            };
            this.validated = false;
        }
    }
}).mount("#app");