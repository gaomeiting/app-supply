import router from "../router/router"
import store from "../store"
console.log(router)

export function handlerError(err) {
    if (err) {
        if(err.status === 401) {
            store.commit('SET_LOGOUT');
            router.replace({
                path: '/login',
                query: {redirect: router.currentRoute.fullPath}
            })
            return;
        }
        if (err.message) {
            this.$message.warning(err.message);
        } else {
            this.$message.warning(err.error);
        }
    } else {
        this.$message.warning('接口调试中');
    }
}