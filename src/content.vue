<template>
    <section>
        <h1>{{ $t("TEST_EXAMPLE") }}</h1>

        <button @click="submitForm">Klik</button>
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
        }
    }
};
</script>

<style scoped lang="scss">

</style>

<i18n>
en:
    active:
        "Active"
    save:
        "Save"
    TEST_EXAMPLE:
        "Test example [EN]"

</i18n>
