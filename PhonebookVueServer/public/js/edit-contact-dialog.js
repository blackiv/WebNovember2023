export default {
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
                  :class="{'was-validated': validated}" novalidate @submit.prevent="save">
              <div class="col-lg-4">
                <input type="text" class="form-control" placeholder="Фамилия" v-model="contact.family" required>
              </div>
              <div class="col-lg-4">
                <input type="text" class="form-control" placeholder="Имя" v-model="contact.name" required>
              </div>
              <div class="col-lg-4">
                <input type="text" class="form-control" placeholder="Телефон" v-model="contact.phone" required>
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

    watch: {
        "contact.phone": function (newPhone) {
            this.contact.phone = newPhone.replace(/\D/g, '');
        }
    },

    methods: {
        show(contact) {
            if (contact === undefined) {
                this.contact = {
                    family: "",
                    name: "",
                    phone: "",
                    id: 0
                };
            } else {
                this.contact = contact;
            }

            this.validated = false;
            this.dialog.show();
        },

        hide() {
            this.dialog.hide();
        },

        save() {
            if (!this.$refs.addForm.checkValidity()) {
                this.validated = true;
                return;
            }
            this.$emit("ok", this.contact);
        }
    }
}