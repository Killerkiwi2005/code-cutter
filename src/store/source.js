import ipc from '../utils/ipc'

export default {
    namespaced: true,
    state: {
        name: 'mysql',
        source: 'mysql',
        options: {
            host: 'localhost',
            port: '3306',
            user: 'test',
            password: 'test',
            database: 'test'
        },
        tables: [],
        columns: []
    },
    getters: {
        name: (state) => {
            return state.name;
        }, 
        source: (state) => {
            return state.source;
        }, 
        options: (state) => {
            return state.options;
        }, 
        columns: (state) => {
            return state.columns;
        },
        tables: (state) => {
            return state.tables;
        },
    },
    mutations: {
        name: (state, name) => {
            state.name = name;
        },
        source: (state, source) => {
            state.source = source;
        },
        tables: (state, tables) => {
            state.tables = tables;
        },
        columns: (state, columns) => {
            state.columns = columns;
        },
        options: (state, options) => {
            state.options = options;
        },
    },
    actions: {

        async restore({ commit }){
            // save the connection
            let content = JSON.parse(await ipc.call({
                command: 'getConnection',
                fileName: 'latest.json',
            }))

            commit('name', content.name)
            commit('source', content.source)
            commit('options', content.options)
        },

        async getTables({ commit, getters }) {
            const tables = await ipc.call({
                command: 'getTables',
                source: getters.source,
                options: getters.options
            });

            commit('tables', tables)

            // save the connection
            await ipc.call({
                command: 'saveConnection',
                fileName: getters.name + '.json',
                content: JSON.stringify({
                    name: getters.name,
                    source: getters.source,
                    options: getters.options
                })
            })

            // save the connection
            await ipc.call({
                command: 'saveConnection',
                fileName: 'latest.json',
                content: JSON.stringify({
                    name: getters.name,
                    source: getters.source,
                    options: getters.options
                })
            })

        },
        async getColumns({ commit, getters }, table) {
            const columns = await ipc.call({
                source: getters.name,
                command: 'getColumns',
                options: getters.options,
                table
            });
            commit('columns', columns)

            return columns
        }
    },
    modules: {
    }
}
