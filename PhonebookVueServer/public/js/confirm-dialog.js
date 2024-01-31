export default {
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

        hide() {
            this.dialog.hide();
        },

        onOk() {
            this.$emit("ok");
        }
    }
}