<template>
    <section>
        <b-form-group
            :label="`${$t('active')}`"
            label-for="is-active"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7"
        >
            <b-form-checkbox name="is-active" switch v-model="active"> </b-form-checkbox>
        </b-form-group>

        <b-form-group
            :label="`${$t('api-user-name')}`"
            label-for="api-user-name"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7"
        >
            <b-form-input id="api-user-name" v-model="userName" type="text" required></b-form-input>
        </b-form-group>

        <b-form-group
            :label="`${$t('api-user-pass')}`"
            label-for="api-user-pass"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7"
        >
            <b-form-input id="api-user-pass" v-model="userPass" type="password" required></b-form-input>
        </b-form-group>

        <b-form-group
            :label="`${$t('options')}`"
            label-for="environment"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7"
        >
            <b-form-select id="environment" v-model="optionSelected" :options="options"></b-form-select>
        </b-form-group>

        <hr />

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
import { BRow, BCol, BFormGroup, BFormInput, BButton, BFormCheckbox, BFormSelect } from "bootstrap-vue";

export default {
    components: {
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BButton,
        BFormCheckbox,
        BFormSelect,
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
            userName: "",
            userPass: "",

            options: [
                { value: "dev", text: "develop" },
                { value: "acc", text: "staging" },
                { value: "prod", text: "production" },
            ],
            optionSelected: null,
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
