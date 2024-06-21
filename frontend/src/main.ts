import { createApp } from "vue";
import axios from "axios";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.baseURL = "http://localhost:3003";

createApp(App).mount("#app");
