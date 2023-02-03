import { createStore } from 'vuex';
import source from './source';
import templates from './templates';
import app from './app';
const store = createStore({
    modules: {
        /* Declare all required modules below */
        source,
        app,
        templates
    }
});

export default store;
