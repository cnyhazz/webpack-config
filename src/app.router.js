import VueRouter from 'vue-router';

const router = new VueRouter({
    routes:[{
        path: '/',
        component: resolve => {
            require.ensure(['./containers/Main'], () => {
                resolve(require('./containers/Main'))
            })
        },
        children: [{
            path: 'index',
            name: '首页',
            component: resolve => {
                require.ensure(['./containers/Index'], () => {
                    resolve(require('./containers/Index'))
                })
            }
        }]
    }]
})

export default router;