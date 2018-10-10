<template>
    <a-breadcrumb :routes="routes">
        <template slot="itemRender" slot-scope="{route, params, routes, paths}">
            <span v-if="routes.indexOf(route) === routes.length - 1">{{route.meta.breadcrumbName}}</span>
            <router-link v-else :to="route.path"><a-icon :type="route.meta.icon" v-if="route.meta.icon" />{{route.meta.breadcrumbName}}</router-link>
        </template>
    </a-breadcrumb>
</template>

<script>
import ABreadcrumb from 'ant-design-vue/lib/breadcrumb'
import AIcon from 'ant-design-vue/lib/icon'

const ABreadcrumbItem = ABreadcrumb.ABreadcrumbItem

export default {
    components: {ABreadcrumb, ABreadcrumbItem, AIcon},
    props: {},
    data() {
        return {
            routes: null
        }
    },
    created() {
        this.getBreadcrumb()
    },
    watch: {
        '$route' () {
            this.getBreadcrumb()
        }
    },
    created() {
        this.getBreadcrumb()
    },
    methods: {
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.name)
            //const first = matched[0]
            //if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
            //    matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched)
            //}
            this.routes = matched
        }
    }
}
</script>
