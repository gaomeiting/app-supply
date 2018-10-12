import * as types from "./mutation-types";

const mutations = {
	[types.SET_LOGIN](state, data) {
		localStorage.user = JSON.stringify(data);
		state.token=data;
	},
    [types.SET_LOGOUT](state) {
        localStorage.removeItem('token');
        state.user = null
    }
}
export default mutations