/**
 * 根据菜单配置自动生成 AntD Menu 组件
 * menuData 示例：
 * [
 *     {title: '菜单标题', icon: '菜单图标', path: '菜单路由', inviisible: true, children:[{子菜单配置}]}
 * ]
 */
import Menu from 'ant-design-vue/lib/menu'
import Icon from 'ant-design-vue/lib/icon'

const {Item, SubMenu} = Menu

// 默认菜单图标数组，如果菜单没配置图标，则会设置从该数组随机取一个图标配置
const iconArr = ['dashboard', 'user', 'form', 'setting', 'message', 'safety', 'bell', 'delete', 'code-o', 'poweroff', 'eye-o', 'hourglass']

export default {
  name: 'IMenu',
  props: {
    menuData: {
      type: Array,
      required: true
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    }
  },
  computed: {
    rootSubmenuKeys: (vm) => {
      let keys = []
      vm.menuData.forEach(item => {
        keys.push(item.path)
      });
      return keys
    }
  },
  created () {
    this.updateMenu()
  },
  watch: {
    collapsed (val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    },
    '$route': function () {
      this.updateMenu()
    }
  },
  methods: {
    renderIcon: function (h, icon) {
      return icon === 'none' ? null : h(Icon, {
        props: {type: icon !== undefined ? icon : iconArr[Math.floor((Math.random() * iconArr.length))]}
      })
    },
    renderMenuItem: function (h, menu, pIndex, index) {
      return h(Item, {
        key: menu.path ? menu.path : 'item_' + pIndex + '_' + index
      },[
        h('a', {attrs: {href: '#' + menu.path}}, [
          this.renderIcon(h, menu.icon),
          h('span', [menu.name])
        ])
      ])
    },
    renderSubMenu: function (h, menu, pIndex, index) {
      var tis = this
      var subItem = [h('span', {slot: 'title'}, [
        this.renderIcon(h, menu.icon),
        h('span', [menu.name])
      ])]
      var itemArr = []
      var _pIdx = pIndex + '_' + index
      menu.children.forEach(function (item, i) {
        itemArr.push(tis.renderItem(h, item, _pIdx, i))
      })
      return h(
        SubMenu,
        {key: menu.path ? menu.path : 'submenu_' + pIndex + '_' + index},
        subItem.concat(itemArr)
      )
    },
    renderItem: function (h, menu, pIndex, index) {
      if (!menu.invisible) {
        return menu.children ? this.renderSubMenu(h, menu, pIndex, index) : this.renderMenuItem(h, menu, pIndex, index)
      }
    },
    renderMenu: function (h, menuTree) {
      var tis = this
      var menuArr = []
      menuTree.forEach(function (menu, i) {
        menuArr.push(tis.renderItem(h, menu, '0', i))
      })
      return menuArr
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    updateMenu() {
      let routes = this.$route.matched.concat()
      this.selectedKeys = [routes.pop().path]
      let openKeys = []
      routes.forEach((item) => {
        openKeys.push(item.path)
      })
      this.collapsed || this.mode === 'horizontal' ? this.cachedOpenKeys = openKeys : this.openKeys = openKeys
    }
  },
  render (h) {
    return h(Menu,
      {
        props: {
          theme: this.$props.theme,
          mode: this.$props.mode,
          openKeys: this.openKeys,
          selectedKeys: this.selectedKeys
        },
        on: {
          onOpenChange: this.onOpenChange,
          select: (obj) => {
            this.selectedKeys = obj.selectedKeys
            this.$emit('select', obj)
          }
        }
      }, this.renderMenu(h, this.menuData)
    )
  }
}
