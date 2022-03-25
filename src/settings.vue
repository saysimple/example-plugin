<template>
    <section>
        <form id="example" method="post" @submit="submitForm">
            <div>
                <label><input type="checkbox" v-model="active" /> {{ active }}</label>
            </div>
            <b-button @click="submitForm">{{ $t("Save") }}</b-button>
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
            carModels: [],
            apiUrl: null,
            apiUser: null,
            apiKey: null,
            apiUrls: [],
        };
    },
    methods: {
        async submitForm(...event) {
            //event.preventDefault();

            console.log(event);

            await this.app.utils.saveData("active", this.active);
        },
        setActive(state) {
            this.active = state;
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
