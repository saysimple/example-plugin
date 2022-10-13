<template>
    <section>
        <h1>{{ $t("@app/example.title") }}</h1>
        <b-button variant="primary" @click="submitForm">{{ $t("@app/example.click") }}</b-button>
    </section>
</template>

<script>
import { BButton, BCol, BFormCheckbox, BFormGroup, BFormInput, BFormSelect, BRow } from "bootstrap-vue";

export default {
    components: {
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BButton,
        BFormCheckbox,
        BFormSelect
    },
    props: {
        app: {
            type: Object,
            required: true
        },
        appData: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    beforeMount() {
        this.init();
    },
    beforeUpdate() {
        this.init();
    },
    methods: {
        init() {
            // Do stuff on when plugin is opened or switched to a new chat
        },
        submitForm() {
            this.app.utils.appendToMessage(`This contact is called ${this.appData.contact.name}`);
            this.app.utils.notify(`This contact is called ${this.appData.contact.name}`);
        }
    }
};
</script>
