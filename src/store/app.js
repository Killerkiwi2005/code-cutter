export default {
    namespaced: true,
    state: {
        error: '',
        
    },
    getters: {
        error: (state) => {
            return state.error;
        }
    },
    mutations: {
        error: (state, error) => {
            state.error = error;
        },
        clearError: (state) => {
            state.error = '';
        }
    },
}
