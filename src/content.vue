<template>
  <section>
    <h1>Test drive with LEF</h1>
    <p>Make your appointment here</p>
  </section>
</template>

<script>

export default {
  components: {},
  props: {
    plugin: {
      type: Object,
      default: {},
    },
    pluginData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      errors: [],
      name: "",
      selectedCar: "",
      selectedType: "Sales", // Default
      selectedSort: "Terugbelverzoek", // Default
      description: "",
      year: "",
      month: "",
      day: "",
      hour: "",
      minute: "",
      email: "",
      phone: "",

      monthNames: [
        this.$t("January"),
        this.$t("February"),
        this.$t("March"),
        this.$t("April"),
        this.$t("May"),
        this.$t("June"),
        this.$t("July"),
        this.$t("August"),
        this.$t("September"),
        this.$t("October"),
        this.$t("November"),
        this.$t("December"),
      ],
      carModels: [],
      types: [],
      sorts: [],
      isSending: false,
      debug: true,
    };
  },
  watch: {
    pluginData: function (newPluginData) {
      this.populate(newPluginData.contact);
    }
  },
  // Because the component is kept alive we need 'activated' too to reset data on identity/page change
  created() {
    this.initForm();
  },
  activated() {
    this.initForm();
  },
  methods: {
    initForm() {
      // Prefill some form fields
      this.populate(this.pluginData.contact);

      // Car models & agent are fixed from settings, not depending on customer data, no need to keep repopulating it.
      this.carModels = this.plugin.getSetting("carModels");
      this.types     = this.plugin.getSetting("lead.types");
      this.sorts     = this.plugin.getSetting("lead.sorts");
      this.agent     = this.pluginData.agent.name;

      // Set selcted type to the first types entry
      this.selectedType = this.types[0];

      this.debug = this.plugin.getSetting("api.url") === "https://api-acc.mijnlef.nl/leads/new/";
    },
    submitForm(event) {
      event.preventDefault();

      this.isSending = true;

      this.errors = [];

      // Validate before submitting
      if (!this.name) {
        this.errors.push(this.$t("Name is required"));
      }

      if (!this.email) {
        this.errors.push(this.$t("E-mail address is required"));
      } else if (!this.validEmail(this.email)) {
        this.errors.push(this.$t("Valid e-mail address is required"));
      }

      if (!this.phone) {
        this.errors.push(this.$t("Telephone is required"));
      }

      if (this.errors.length === 0) {
        const formData = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          car: this.selectedCar,
          type: this.selectedType,
          sort: this.selectedSort,
          date: this.year + "-" + this.month.toString().padStart(2, "0") + "-" + this.day.toString()
                                                                                     .padStart(2, "0"),
          time: this.hour.toString().padStart(2, "0") + ":" + this.minute.toString().padStart(2, "0"),
          description: this.description || "LEAD Saysimple Inbox",
          agent: this.agent,
        };

        this.send(formData);
      } else {
        this.isSending = false;
      }
    },
    generateXml(data) {
      return `<?xml version="1.0" encoding="UTF-8"?>
<Leads xmlns="http://www.uname-it.nl/unameit/xsd/LEF/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.uname-it.nl/unameit/xsd/LEF/ Leads.xsd">
    <Lead>
        <LeadType>${data.type}</LeadType>
        <SoortLead>${data.sort}</SoortLead>
        <Omschrijving>${ data.description }</Omschrijving>
        <LeadBron>Saysimple LEF plugin</LeadBron>
        <Relatie>
            <Particulier>
                <!-- <Voornaam>${ data.name }</Voornaam> -->
                <Achternaam>${ data.name }</Achternaam>
            </Particulier>
            <TelefoonNummers>
                <TelefoonNummer>
                    ${data.phone}
                </TelefoonNummer>
            </TelefoonNummers>
            <EmailAdres>
                ${data.email}
            </EmailAdres>
        </Relatie>
        <GewenstVoertuig>
            <Model>
                ${ data.car }
            </Model>
        </GewenstVoertuig>
        <ExtraInfo>
            <Groep>
                <Naam>Overige informatie</Naam>
                <Pair>
                    <Key>Gewenste datum</Key>
                    <Value>${data.date}</Value>
                </Pair>
                <Pair>
                    <Key>Gewenste tijd</Key>
                    <Value>${data.time}</Value>
                </Pair>
                <Pair>
                    <Key>Agent</Key>
                    <Value>${ data.agent }</Value>
                </Pair>
            </Groep>
        </ExtraInfo>
    </Lead>
</Leads>`;
    },
    send(data) {
      const xml = this.generateXml(data);

      this.plugin.apiCall({
                            url: this.plugin.getSetting("api.url"),
                            method: "POST",
                            auth: {
                              username: this.plugin.getSetting("api.username"),
                              password: this.plugin.getSetting("api.password"),
                            },
                            headers: {
                              "Content-Type": "text/xml",
                            },
                            data: xml,
                          })
          .then(() => {
            this.plugin.notify(this.$t("Lead has been submitted."));
            // Reset form after submission
            this.initForm();
            this.plugin.close();
          })
          .catch((error) => {
            this.plugin.notify(this.$t("Something went wrong while sending, try again later"), "error");
            console.error(error);
          })
          .finally(() => {
            this.isSending = false;
          });
    },
    validEmail(email) {
      return email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    },
    populate(contact) {
      this.name     = contact.name;
      this.email    = contact.email;
      this.phone    = contact.phone;
      this.day      = new Date().getDate();
      this.month    = new Date().getMonth() + 1;
      this.year     = new Date().getFullYear();
      this.hour     = new Date().getHours();
      const minute  = new Date().getMinutes();
      this.minute   = minute - (minute % 15); // round on nearest 15 minutes
      this.description = "";
      this.car      = "";
    }
  },
};
</script>

<style scoped lang="scss">
#plugin-container #content input.button:disabled {
  background-color: #EAE8E9;
}

#demo-enabled {
  position: absolute;
  bottom: 24px;

  svg {
    color: darkorange;
  }
}
</style>

<i18n>
{
  "en": {
    "Test drive with LEF": "Create LEF appointment",
    "Make your appointment here": "Make your appointment here",
    "Name": "Name",
    "E-mail address": "E-mail address",
    "Telephone": "Telephone",
    "Car and model": "Car and model",
    "Date": "Date",
    "Time": "Time",
    "LeadType": "Lead Type",
    "LeadSort": "Lead Sort",
    "LeadDescription": "Lead Description",
    "January": "January",
    "February": "February",
    "March": "March",
    "April": "April",
    "May": "May",
    "June": "June",
    "July": "July",
    "August": "August",
    "September": "September",
    "October": "October",
    "November": "November",
    "December": "December",
    "Name is required": "Name is required",
    "E-mail address is required": "E-mail address is required",
    "Valid e-mail address is required": "Valid e-mail address is required",
    "Telephone is required": "Telephone is required",
    "Lead has been submitted.": "Lead has been submitted.",
    "Something went wrong while sending, try again later": "Something went wrong while sending, try again later",
    "Types": "Appointment type",
    "Make appointment": "Make appointment",
    "Sales": "Sales",
    "Aftersales": "After Sales",
    "Fleetsales": "Fleet Sales",
    "Terugbelverzoek": "Callback Request",
    "Contactverzoek": "Contact Request",
    "HoudMijOpDeHoogte": "Keep me informed",
    "Klanttevredenheid": "Customer satisfaction",
    "Taxatie": "Taxation",
    "Proefrit": "Test drive",
    "Offerte": "Quotation",
    "Showroombezoek": "Showroom visit",
    "Brochure": "Leaflet",
    "Verzekering": "Insurance",
    "Financiering": "Financing",
    "PrivateLease": "Private Lease",
    "ZakelijkLeasen": "Business Leasing",
    "Bieding": "Bid",
    "Mailing": "Mailing",
    "Werkplaatsofferte": "Workshop quote",
    "Banden": "Tyres",
    "Werkplaatsafspraak": "Workshop appointment",
    "APK": "APK",
    "Reparatie": "Repair",
    "Onderhoud": "Maintenance",
    "Garantie": "Guarantee",
    "Loyalty": "loyalty",
    "ShortLease": "Short Lease",
    "Verhuur": "Rental",
    "Schade": "Damage",
    "CarConfigurator": "Car Configurator",
    "Accessoires": "Accessories",
    "Klacht": "Complaint",
    "Event": "Event",
    "TelefonischeLead": "Telephone Lead",
    "Webshop": "Webshop",
    "Zoekopdracht": "Search",
    "Bellijst": "Call list",
    "Terugroepactie": "Recall",
    "Overig": "Other",
    "debug_mode_enabled": "Demo enabled"
  },
  "nl": {
    "Test drive with LEF": "Maak afspraak in LEF",
    "Make your appointment here": "Maak hier je afspraak",
    "Please correct the following error(s):": "Verbeter de volgende foutmelding: | Verbeter de volgende foutmeldingen: ",
    "Name": "Naam",
    "E-mail address": "E-mail adres",
    "Telephone": "Telefoon",
    "Car and model": "Auto en model",
    "Date": "Datum",
    "Time": "Tijd",
    "LeadType": "Leadtype",
    "LeadSort": "Soort lead",
    "LeadDescription": "Lead omschrijving",
    "January": "januari",
    "February": "februari",
    "March": "maart",
    "April": "april",
    "May": "mei",
    "June": "juni",
    "July": "juli",
    "August": "augustus",
    "September": "september",
    "October": "oktober",
    "November": "november",
    "December": "december",
    "Name is required": "Naam is verplicht",
    "E-mail address is required": "E-mailadres is verplicht",
    "Valid e-mail address is required": "Geldig e-mail address is verplicht",
    "Telephone is required": "Telephone is required",
    "Lead has been submitted.": "Lead is verstuurd.",
    "Something went wrong while sending, try again later": "Er ging iets mis met verzenden, probeer het later nogmaals",
    "Types": "Type afspraak",
    "Make appointment": "Maak afspraak",
    "Sales": "Sales",
    "Aftersales": "Aftersales",
    "Fleetsales": "Fleetsales",
    "Terugbelverzoek": "Terugbelverzoek",
    "Contactverzoek": "Contactverzoek",
    "HoudMijOpDeHoogte": "Houd mij op de hoogte",
    "Klanttevredenheid": "Klanttevredenheid",
    "Taxatie": "Taxatie",
    "Proefrit": "Proefrit",
    "Offerte": "Offerte",
    "Showroombezoek": "Showroombezoek",
    "Brochure": "Brochure",
    "Verzekering": "Verzekering",
    "Financiering": "Financiering",
    "PrivateLease": "Private lease",
    "ZakelijkLeasen": "Zakelijk leasen",
    "Bieding": "Bieding",
    "Mailing": "Mailing",
    "Werkplaatsofferte": "Werkplaatsofferte",
    "Banden": "Banden",
    "Werkplaatsafspraak": "Werkplaatsafspraak",
    "APK": "APK",
    "Reparatie": "Reparatie",
    "Onderhoud": "Onderhoud",
    "Garantie": "Garantie",
    "Loyalty": "Loyalty",
    "ShortLease": "Short lease",
    "Verhuur": "Verhuur",
    "Schade": "Schade",
    "CarConfigurator": "Car configurator",
    "Accessoires": "Accessoires",
    "Klacht": "Klacht",
    "Event": "Event",
    "TelefonischeLead": "Telefonische lead",
    "Webshop": "Webshop",
    "Zoekopdracht": "Zoekopdracht",
    "Bellijst": "Bellijst",
    "Terugroepactie": "Terugroepactie",
    "Overig": "Overig",
    "debug_mode_enabled": "Demo ingeschakeld"
  },
  "es": {
    "Test drive with LEF": "Crear cita LEF",
    "Make your appointment here": "Haga su cita aquí",
    "Name": "Nombre",
    "E-mail address": "Dirección de correo electrónico",
    "Telephone": "Teléfono",
    "Car and model": "Coche y modelo",
    "Date": "Fecha",
    "Time": "Hora",
    "LeadType": "Tipo de prospecto",
    "LeadSort": "Clasificación de prospectos",
    "LeadDescription": "Descripción",
    "January": "Enero",
    "February": "Febrero",
    "March": "Marzo",
    "April": "Abril",
    "May": "Mayo",
    "June": "Junio",
    "July": "Julio",
    "August": "Agosto",
    "September": "Septiembre",
    "October": "Octubre",
    "November": "Noviembre",
    "December": "Diciembre",
    "Name is required": "Se requiere el nombre",
    "E-mail address is required": "Se requiere la dirección de correo electrónico",
    "Valid e-mail address is required": "Se requiere una dirección de correo electrónico válida",
    "Telephone is required": "Se requiere el teléfono",
    "Lead has been submitted.": "El cliente potencial ha sido enviado.",
    "Something went wrong while sending, try again later": "Algo ha ido mal durante el envío, inténtelo de nuevo más tarde",
    "Types": "Tipo de cita",
    "Make appointment": "Programar cita",
    "Sales": "Ventas",
    "Aftersales": "Después de las ventas",
    "Fleetsales": "Ventas de flotas",
    "Terugbelverzoek": "Solicitud de devolución de llamada",
    "Contactverzoek": "Solicitud de contacto",
    "HoudMijOpDeHoogte": "Mantenme informado",
    "Klanttevredenheid": "La satisfacción del cliente",
    "Taxatie": "Impuestos",
    "Proefrit": "Prueba de conducción",
    "Offerte": "Cotización",
    "Showroombezoek": "Visita a la sala de exposición",
    "Brochure": "Folleto",
    "Verzekering": "Seguro",
    "Financiering": "Financiación",
    "PrivateLease": "Arrendamiento privado",
    "ZakelijkLeasen": "Negocios Arrendamiento",
    "Bieding": "Licitación",
    "Mailing": "Mailing",
    "Werkplaatsofferte": "Envío",
    "Banden": "Neumáticos",
    "Werkplaatsafspraak": "Cita de taller",
    "APK": "APK",
    "Reparatie": "Reparar",
    "Onderhoud": "Mantenimiento",
    "Garantie": "Garantía",
    "Loyalty": "Lealtad",
    "ShortLease": "Arrendamiento corto",
    "Verhuur": "Alquiler",
    "Schade": "Daño",
    "CarConfigurator": "Configurador de coches",
    "Accessoires": "Accesorios",
    "Klacht": "Queja",
    "Event": "Evento",
    "TelefonischeLead": "Líder telefónico",
    "Webshop": "Webshop",
    "Zoekopdracht": "Búsqueda",
    "Bellijst": "Lista de llamadas",
    "Terugroepactie": "Recuerdo",
    "Overig": "Otro",
    "debug_mode_enabled": "Demostración habilitado"
  }
}
</i18n>
