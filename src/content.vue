<template>
    <section>
        <h1>{{ $t("@saysimple-plugins/example.TEST_EXAMPLE") }}</h1>

        <button @click="submitForm">{{ $t("@saysimple-plugins/example.click") }}</button>
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

<style scoped lang="scss">

</style>