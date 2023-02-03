<template>
    <div>
    <CodeGenerator />
    <LoadingSpinner/>
    </div>
</template>

<script>
import CodeGenerator from "./components/CodeGenerator.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";

export default {
    name: "App",
    components: {
        CodeGenerator,LoadingSpinner
    },
    mounted(){
        
    }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
