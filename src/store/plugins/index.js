// ÖÐ¼ä¼þ
import createLogger from 'vuex/dist/logger'

const plugins = [
        store => {
        store.subscribe(({ payload }) => {
            if (!payload || !payload.__status__) {
                return
            }
            switch (payload.__status__) {
                case 'pending':
                    break
                case 'success':
                    break
                case 'error':
                    break
                default:
            }
        })
    }
]

if (module.hot) {
    plugins.unshift(createLogger())
}

export default plugins