<template>
  <CodeGenerator />
</template>

<script>
import CodeGenerator from "./components/CodeGenerator.vue";

export default {
    name: "App",
    components: {
        CodeGenerator,
    },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
