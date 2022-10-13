<template>
    <section>
        <form method="post" @submit.prevent="submitForm">

            <!-- START Mandatory, do not change -->
            <b-form-group
                :label="`${$t('@app/example.settings.active')}`"
                content-cols-lg="7"
                content-cols-sm
                label-cols-lg="3"
                label-cols-sm="4"
                label-for="active"
            >
                <b-form-checkbox id="active" v-model="active" switch></b-form-checkbox>
            </b-form-group>
            <!-- END -->

            <b-form-group
                :label="$t('@app/example.api-user-name')"
                content-cols-lg="7"
                content-cols-sm
                label-cols-lg="3"
                label-cols-sm="4"
                label-for="api-user-name"
            >
                <b-form-input id="api-user-name" v-model="userName" required type="text"></b-form-input>
            </b-form-group>

            <b-form-group
                :label="`${$t('@app/example.api-user-pass')}`"
                content-cols-lg="7"
                content-cols-sm
                label-cols-lg="3"
                label-cols-sm="4"
                label-for="api-user-pass"
            >
                <b-form-input id="api-user-pass" v-model="userPass" required type="password"></b-form-input>
            </b-form-group>

            <b-form-group
                :label="`${$t('@app/example.options')}`"
                content-cols-lg="7"
                content-cols-sm
                label-cols-lg="3"
                label-cols-sm="4"
                label-for="environment"
            >
                <b-form-select id="environment" v-model="environment" :options="options"></b-form-select>
            </b-form-group>

            <!-- START Mandatory, do not change -->
            <hr />

            <b-row class="mt-2">
                <b-col offset-md="3">
                    <b-button :disabled="isSaving" class="mb-2" type="submit" variant="primary">
                        <b-spinner v-if="isSaving" class="mr-50" small></b-spinner>
                        {{ $t("@app/example.settings.save") }}
                    </b-button>
                </b-col>
            </b-row>
            <!-- END -->

        </form>
    </section>
</template>

<style scoped></style>

<script>
import { BButton, BCol, BFormCheckbox, BFormGroup, BFormInput, BFormSelect, BRow, BSpinner } from "bootstrap-vue";
import { onBeforeMount, ref } from "@vue/composition-api";

export default {
    components: {
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BButton,
        BFormCheckbox,
        BFormSelect,
        BSpinner,
    },
    props: {
        app: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const isSaving = ref(false);

        const active = ref(props.app.settings.active);
        const userName = ref(props.app.settings.userName);
        const userPass = ref(props.app.settings.userPass);
        const environment = ref(props.app.settings.environment);

        const options = [
            { value: "dev", text: "develop" },
            { value: "acc", text: "staging" },
            { value: "prod", text: "production" },
        ];

        const submitForm = async () => {
            isSaving.value = true;

            await props.app.utils
                .saveSettings({
                    active: active.value,
                    userName: userName.value,
                    userPass: userPass.value,
                    environment: environment.value,
                })
                .then(() => {
                    props.app.utils.notify("Saved!", "success");
                })
                .catch(() => {
                    props.app.utils.notify("Failed!", "error");
                }).finally(() => isSaving.value = false);
        };

        const initSettings = () => {
            active.value = props.app.utils.getSetting("active");
            userName.value = props.app.utils.getSetting("userName");
            userPass.value = props.app.utils.getSetting("userPass");
            environment.value = props.app.utils.getSetting("environment");
        };

        onBeforeMount(initSettings);

        return {
            isSaving,
            active,
            userName,
            userPass,
            options,
            environment,
            submitForm,
        };
    },
};
</script>
