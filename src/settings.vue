<template>
    <section>
        <form id="lef" method="post" @submit="submitForm">
            <pre
                >{{ JSON.stringify(app, null, "\t") }}
            </pre>

            <code> Active: {{ activeSetting }}, {{ active }} </code>

            <b-button>{{ $t("Save") }}</b-button>
            <input class="button save" type="submit" :value="$t('Save')" />
        </form>
    </section>
</template>

<style scoped>
#apiUrl {
    width: 255px;
}

.menu-item textarea {
    width: 300px;
}
</style>

<script>
import { BButton } from "bootstrap-vue";

export default {
    components: {
        BButton,
    },
    props: {
        app: {
            type: Object,
            required: true,
        },
    },
    setup({ app }) {
        return {
            carModels: [],
            active: app.appTools.getSetting("active"),
            apiUrl: null,
            apiUser: null,
            apiKey: null,
            apiUrls: [],
        };
    },
    methods: {
        toggleActive() {
            this.active = !this.active; // Toggle between 0 and 1
            return this.active;
        },
        submitForm(event) {
            event.preventDefault();

            this.toggleActive();

            console.log("START SAVE DATA");
            this.app.appTools.saveData("active", this.active).then(() => console.log("END SAVE DATA"));
        },
    },
    computed: {
        activeSetting() {
            return this.app.appTools.getSetting("active");
        },
    },
};
</script>

<i18n>
{
  "en": {
    "Active": "Active",
    "Stage": "Stage",
    "API User": "API User",
    "API Key": "API Key",
    "Car models": "Car models",
    "Save": "Save",
    "Live": "Live",
    "Acceptance": "Acceptance"
  },
  "nl": {
    "Active": "Actief",
    "Stage": "Fase",
    "API User": "API Gebruiker",
    "API Key": "API Sleutel",
    "Car models": "Automodellen",
    "Save": "Opslaan",
    "Live": "Live",
    "Acceptance": "Acceptance"
  },
  "es": {
    "Active": "Activo",
    "Stage": "Stage",
    "API User": "Usuario de API",
    "API Key": "API Key",
    "Car models": "Modelos de coche",
    "Save": "Guardar",
    "Live": "Live",
    "Acceptance": "Acceptance"
  }
}
</i18n>
