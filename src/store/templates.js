import ipc from '../utils/ipc'

export default {
    namespaced: true,
    state: {
        templates: [],
        template: ''
    },
    getters: {
        templates: (state) => {
            return state.templates;
        }, 
    },
    mutations: {
        templates: (state, templates) => {
            state.templates = templates;
        },
        template: (state, template) => {
            state.template = template;
        }
    },
    actions: {

        async getTemplates({ commit }) {
            const templates = await ipc.call({
                command: 'getTemplates'
            });

            commit('templates', templates)
        },

        async getTemplate({ commit }, fileName) {
            const template = await ipc.call({
                command: 'getTemplate',
                fileName: fileName
            });

            commit('template', template)

            return template
        }
    }
}
