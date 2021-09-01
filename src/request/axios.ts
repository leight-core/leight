import {RequestTimeout} from "@leight-core/leight";
import axios from "axios";

axios.defaults.timeout = RequestTimeout;
