<template>
    <section>
        <div>
            <label><input type="checkbox" v-model="active" /> {{ active }}</label>
        </div>

        <b-row class="mt-2">
            <b-col offset-md="3">
                <b-button id="submit" variant="primary" class="mb-2" @click="submitForm">
                    {{ $t("save") }}
                </b-button>
            </b-col>
        </b-row>
    </section>
</template>

<style scoped></style>

<script>
import { BRow, BCol, BButton, BFormCheckbox } from "bootstrap-vue";

export default {
    components: {
        BRow,
        BCol,
        BButton,
        BFormCheckbox,
    },
    props: {
        app: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            active: false,
        };
    },
    methods: {
        async submitForm(event) {
            event.preventDefault();

            await this.app.utils.saveSettings({
                active: this.active,
            });
        },
    },
};
</script>

<i18n>
{
  "en": {
    "active": "Active",
    "save": "Save"
  },
  "nl": {
    "active": "Actief",
    "save": "Opslaan"
  },
  "es": {
    "active": "Activo",
    "save": "Guardar"
  }
}
</i18n>
