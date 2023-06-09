<template>
    <section id="app-example-app">
        <h5 class="mb-1">
            <font-awesome-icon :icon="['fas', 'car-side']" />
            {{ $t("@app/example-app.content.title") }}
        </h5>
        <div class="text-center">
            <b-spinner v-if="isLoading" class="mb-2" />
        </div>

        <table v-if="randomVehicle && !isLoading" class="mb-2">
            <tr>
                <td>{{ $t("@app/example-app.content.vehicle.name") }}</td>
                <td>{{ randomVehicle.name }}</td>
            </tr>
            <tr>
                <td>{{ $t("@app/example-app.content.vehicle.model") }}</td>
                <td>{{ randomVehicle.model }}</td>
            </tr>
            <tr>
                <td>{{ $t("@app/example-app.content.vehicle.class") }}</td>
                <td>{{ randomVehicle.starship_class }}</td>
            </tr>
            <tr>
                <td>
                    {{ $t("@app/example-app.content.vehicle.manufacturer") }}
                </td>
                <td>{{ randomVehicle.manufacturer }}</td>
            </tr>
            <tr v-if="randomVehicle.cost_in_credits !== 'unknown'">
                <td>
                    {{ $t("@app/example-app.content.vehicle.cost-in-credits") }}
                </td>
                <td>{{ vehicleCost(randomVehicle.cost_in_credits) }}</td>
            </tr>
            <tr>
                <td>{{ $t("@app/example-app.content.vehicle.length") }}</td>
                <td>{{ randomVehicle.length }}</td>
            </tr>
            <tr>
                <td>{{ $t("@app/example-app.content.vehicle.max-speed") }}</td>
                <td>{{ randomVehicle.max_atmosphering_speed }}</td>
            </tr>
            <tr>
                <td>{{ $t("@app/example-app.content.vehicle.crew") }}</td>
                <td>{{ randomVehicle.crew }}</td>
            </tr>
            <tr>
                <td>{{ $t("@app/example-app.content.vehicle.passengers") }}</td>
                <td>{{ randomVehicle.passengers }}</td>
            </tr>
            <tr>
                <td>
                    {{ $t("@app/example-app.content.vehicle.cargo-capacity") }}
                </td>
                <td>{{ randomVehicle.cargo_capacity }}</td>
            </tr>
            <tr>
                <td>
                    {{
                        $t("@app/example-app.content.vehicle.hyperdrive-rating")
                    }}
                </td>
                <td>{{ randomVehicle.hyperdrive_rating }}</td>
            </tr>
            <tr>
                <td>{{ $t("@app/example-app.content.vehicle.mglt") }}</td>
                <td>{{ randomVehicle.MGLT }}</td>
            </tr>
        </table>
        <b-button class="w-100" variant="primary" @click="createMessage">
            {{ $t("@app/example-app.content.generate-message") }}
        </b-button>
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

        const i18n = props.app.utils.i18n;

        const userName = ref(props.app.settings.userName);
        const userPass = ref(props.app.settings.userPass);
        const environment = ref(props.app.settings.environment);

        const initSettings = () => {
            userName.value = props.app.utils.getSetting("userName", "");
            userPass.value = props.app.utils.getSetting("userPass", "");
            environment.value = props.app.utils.getSetting(
                "environment",
                "dev"
            );

            loadData();
        };

        // https://swapi.dev/
        const loadData = async () => {
            isLoading.value = true;

            // Pick a random page of vehicles available in SWAPI
            const randomPage = randomNumber(3) + 1;

            randomVehicle.value = await props.app.utils
                .apiCall({
                    url: `https://swapi.dev/api/starships/?page=${randomPage}`,
                    method: "GET",
                })
                .then(
                    (result) =>
                        result.results[randomNumber(result.results.length)]
                )
                .finally(() => (isLoading.value = false));
        };

        const randomNumber = (max) => {
            return Math.floor(Math.random() * max);
        };

        const vehicleCost = (amountInCredits) => {
            if (amountInCredits == "unknown") {
                return;
            }

            // One imperial credit is about $4
            return (amountInCredits / 4).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        };

        const createMessage = () => {
            props.app.utils.appendToMessage(
                i18n.t("@app/example-app.content.message-maintenance", {
                    contactName: props.appData.contact.name,
                    vehicleName: randomVehicle.value.name,
                    manufacturer: randomVehicle.value.manufacturer,
                    agentName: props.appData.assignedAgent
                        ? props.appData.assignedAgent.name
                        : "R2-D2",
                })
            );
            //`Dear ${props.appData.contact.name},\n\nYour ${randomVehicle.value.name} is due for some maintenance. Please contact ${randomVehicle.value.manufacturer} for an appointment.\n\nRegards,\n${props.appData.assignedAgent ? props.appData.assignedAgent.name : 'R2-D2'}`);
            props.app.utils.notify(
                i18n.t("@app/example-app.content.message-generated")
            );
        };

        onBeforeMount(initSettings);

        return {
            isLoading,
            randomVehicle,
            vehicleCost,
            createMessage,
        };
    },
};
</script>

<style lang="scss">
#app-example-app {
    table tr td {
        font-size: 12px;
        vertical-align: top;

        &:first-child {
            font-weight: bold;
            margin-right: 12px;
        }
    }
}
</style>
