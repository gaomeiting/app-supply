
import router from "../router/router"
import store from "../store"
import {
    message
} from 'ant-design-vue';

export function handlerError(err) {
    console.log(err)
    if (err) {
        if(err.status == 401) {
            store.commit('SET_LOGOUT');
            router.replace({
                path: '/login',
                query: {redirect: router.currentRoute.fullPath}
            })
            return;
        }
        if (err.message) {
            message.warning(err.message);
        } else {
            message.warning(err.error);
        }
    } else {
        message.warning('接口调试中');
    }
}