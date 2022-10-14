<template>
    <section>
        <h5>{{ $t("@app/example-app.content.title") }}</h5>
        <pre>{{ randomVehicle }}</pre>
        <pre>{{ isLoading }}</pre>
        <b-spinner v-if="isLoading" />


        <b-button class="w-100" variant="primary" @click="createMessage">{{ $t("@app/example-app.content.generate-message") }}</b-button>
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
            required: true,
        },
        appData: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    setup(props) {
        const isLoading = ref(false);
        const randomVehicle = ref({});

        const userName = ref(props.app.settings.userName);
        const userPass = ref(props.app.settings.userPass);
        const environment = ref(props.app.settings.environment);

        const initSettings = () => {
            userName.value = props.app.utils.getSetting("userName", "");
            userPass.value = props.app.utils.getSetting("userPass", "");
            environment.value = props.app.utils.getSetting("environment", "dev");

            loadData();
        };

        // https://swapi.dev/
        const loadData = async () => {
            isLoading.value = true;

            // Pick a random page of vehicles available in SWAPI
            const randomPage = randomNumber(3) + 1;

            randomVehicle.value = await props.app.utils.apiCall({
                    url: `https://swapi.dev/api/vehicles/?page=${randomPage}`,
                    method: "GET",
                },
            )
                .then((result) => result.results[randomNumber(result.results.length)])
                .finally(() => isLoading.value = false);
        };

        const randomNumber = (max) => {
            return Math.floor(Math.random() * max);
        };

        const createMessage = () => {
            props.app.utils.appendToMessage(`Dear ${props.appData.contact.name},\n\nYour ${randomVehicle.value.name} is due for some maintenance. Please contact ${randomVehicle.value.manufacturer} for an appointment.\n\nRegards,\n${props.appData.assignedAgent.name}`);
        };

        onBeforeMount(initSettings);

        return {
            isLoading,
            randomVehicle,
            createMessage,
        };
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
    //
    //         this.app.utils.notify(`This contact is called ${this.appData.contact.name}`);
    //     }
    // }
};
</script>
