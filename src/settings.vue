<template>
    <section>
        <div>
            <label><input type="checkbox" v-model="active" /> {{ active }}</label>
        </div>
        <b-button @click="submitForm">{{ $t("save") }}</b-button>
    </section>
</template>

<style scoped>
</style>

<script>
import { BButton, BFormCheckbox } from "bootstrap-vue";

export default {
    components: {
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
