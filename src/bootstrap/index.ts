import axios from "axios";
import axiosRetry from "axios-retry";

axios.defaults.timeout = 1000 * 60;

axiosRetry(axios, {
	retries: 5,
	retryCondition: _ => true,
	retryDelay: axiosRetry.exponentialDelay,
});
