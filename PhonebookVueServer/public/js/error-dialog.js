export default {
    template: `
      <div class="modal fade" ref="modalErrorDialog" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content alert-danger">
          <div class="modal-body alert-danger alert mb-0">
            <div class="row justify-content-around mb-4 border-bottom border-danger-subtle">
              <div class="col-11">
                <h1 class="modal-title fs-5">Ошибка</h1>
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
}