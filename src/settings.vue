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
            <b-form-checkbox name="is-active" switch v-model="active.value"></b-form-checkbox>
        </b-form-group>

        <b-form-group
            :label="$t('api-user-name')"
            label-for="api-user-name"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7"
        >
            <b-form-input id="api-user-name" v-model="userName.value" type="text" required></b-form-input>
        </b-form-group>

        <b-form-group
            :label="`${$t('api-user-pass')}`"
            label-for="api-user-pass"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7"
        >
            <b-form-input id="api-user-pass" v-model="userPass.value" type="password" required></b-form-input>
        </b-form-group>

        <b-form-group
            :label="`${$t('options')}`"
            label-for="environment"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7"
        >
            <b-form-select id="environment" v-model="environment.value" :options="options"></b-form-select>
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
import { BButton, BCol, BFormCheckbox, BFormGroup, BFormInput, BFormSelect, BRow } from "bootstrap-vue";
import { onBeforeMount, onBeforeUpdate, ref } from "@vue/composition-api";

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
        }
    },
    setup(props) {
        const active = ref(props.app.settings.active);
        const userName = ref(props.app.settings.userName);
        const userPass = ref(props.app.settings.userPass);
        const environment = ref(props.app.settings.environment);

        const options = [
            { value: "dev", text: "develop" },
            { value: "acc", text: "staging" },
            { value: "prod", text: "production" }
        ];


        const submitForm = async (event) => {
            event.preventDefault();
            await props.app.utils.saveSettings({
                active: active.value,
                userName: userName.value,
                userPass: userPass.value,
                environment: environment.value,
            })
            .then(() => {
                props.app.utils.notify("Saved!", "success")
            })
            .catch(() => {
                props.app.utils.notify("Failed!", "error")
            });
        };

        const initSettings = () => {
            active.value = props.app.utils.getSetting("active");
            userName.value = props.app.utils.getSetting("userName");
            userPass.value = props.app.utils.getSetting("userPass");
            environment.value = props.app.utils.getSetting("environment");
        };

        onBeforeMount(initSettings);
        onBeforeUpdate(initSettings);

        return {
            active,
            userName,
            userPass,
            options,
            environment,
            submitForm,
        }
    },
};
</script>

<i18n lang="json">
{
    "en": {
        "api-user-name": "Api User [EN]"
    }
}
</i18n>
