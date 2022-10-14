<template>
    <section>
        <h5>{{ $t("@app/example-app.content.title") }}</h5>
        <b-button variant="primary" @click="submitForm">{{ $t("@app/example-app.content.click-me") }}</b-button>
    </section>
</template>

<script>
import { BButton, BSpinner } from "bootstrap-vue";
import { onBeforeMount, ref } from "@vue/composition-api";

export default {
    components: {
        BButton,
        BSpinner,
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
    setup(props) {
        const active = ref(props.app.settings.active);
        const userName = ref(props.app.settings.userName);
        const userPass = ref(props.app.settings.userPass);
        const environment = ref(props.app.settings.environment);

        const initSettings = () => {
            active.value = Boolean(props.app.utils.getSetting("active", false));
            userName.value = props.app.utils.getSetting("userName", "");
            userPass.value = props.app.utils.getSetting("userPass", "");
            environment.value = props.app.utils.getSetting("environment", "dev");
        };

        onBeforeMount(initSettings);

        const submitForm = async () => {
            console.log("BAM!");
        };

        return {
            submitForm
        }
    },
    // beforeMount() {
    //     this.init();
    // },
    // beforeUpdate() {
    //     this.init();
    // },
    // methods: {
    //     init() {
    //         // Do stuff on when plugin is opened or switched to a new chat
    //     },
    //     submitForm() {
    //         this.app.utils.appendToMessage(`This contact is called ${this.appData.contact.name}`);
    //         this.app.utils.notify(`This contact is called ${this.appData.contact.name}`);
    //     }
    // }
};
</script>
