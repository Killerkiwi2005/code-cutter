export default {
    namespaced: true,
    state: {
        error: '',
        loading: false,
    },
    getters: {
        error: (state) => {
            return state.error;
        },
        loading: (state) => {
            return state.loading;
        }
    },
    mutations: {
        error: (state, error) => {
            state.error = error;
        },
        clearError: (state) => {
            state.error = '';
        },
        loading: (state, loading) => {
            state.loading = loading;
        }
    },
}
