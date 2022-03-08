<template>
  <section>
    <form id="lef" method="post" @submit="submitForm">
      <input class="button save" type="submit" :value='$t("Save")'/>
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

export default {
  components: {
  },
  props: {
    plugin: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      carModels: null,
      active: null,
      apiUrl: null,
      apiUser: null,
      apiKey: null,
      apiUrls: [
        {
          label: this.$t("Live"),
          url: "https://api.mijnlef.nl/leads/new/",
        },
        {
          label: this.$t("Acceptance"),
          url: "https://api-acc.mijnlef.nl/leads/new/",
        },
      ],
    };
  },
  created() {
    // Load plugin settings into model
    this.carModels = this.plugin.getSetting("carModels").join("\n");
    this.active    = this.plugin.getSetting("active");
    this.apiUrl    = this.plugin.getSetting("api.url");
    this.apiUser   = this.plugin.getSetting("api.username");
    this.apiKey    = this.plugin.getSetting("api.password");
  },
  methods: {
    toggleActive() {
      this.active ^= 1; // Toggle between 0 and 1
      return this.active;
    },
    submitForm(event) {
      event.preventDefault();

      $nuxt.$emit("savePluginSettings", {
        name: this.plugin.name,
        active: Number(this.active),
        carModels: this.carModels.split("\n").filter((model) => model),
        api: {
          url: this.apiUrl,
          username: this.apiUser,
          password: this.apiKey,
        }
      });
    }
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
