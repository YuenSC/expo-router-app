import axios from "axios";

import Config from "../Config";

axios.defaults.baseURL = Config.apiUrl;
