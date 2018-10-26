import * as types from "./mutation-types";

const mutations = {
	[types.SET_LOGIN](state, data) {
		localStorage.user = JSON.stringify(data);
		state.user= data;
	},
    [types.SET_LOGOUT](state) {
        localStorage.removeItem('user');
        state.user = null
    },
    [types.SET_STATUS](state, num) {
        localStorage.status = JSON.stringify({status: num});
        state.status = num;
    }
}
export default mutations
