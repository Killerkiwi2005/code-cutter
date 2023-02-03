<template>
<div>
    <div v-if="error" class="notification is-danger">
        <button class="delete" @click="clearError"></button>
        {{ error }}
    </div>

  <div class="grid">

    <div>


    <div>
        <div class="m-2">
            <my-sql-connection></my-sql-connection>

            <div class="notification mt-5">

  <h1>Code Cutter 0.1</h1>
  <p>takes schema from mysql and generates code using handle bar templates</p>
  <p>Optional Open AI</p>
</div>
        </div>
    </div>

    <div id="item-0">


    </div>

    </div>
    <div>
    <div class="m-2">

      <div class="field">
        <label class="label">Table / Object</label>
        <div class="control">
            <select class="input" v-model="table">
                <option value="" selected class="hidden">select an object</option>
        <option v-for="table in tables" v-bind:key="table" :value="table">{{table}}</option>
      </select>
        </div>
      </div>




      <div class="field">
        <label class="label">Templates</label>
        <div class="control">
            <select class="input" @change="loadTemplate($event.target.value)" >
                <option value="" selected  class="hidden">select a template</option>
<option v-for="template in templates" v-bind:key="template" :value="template">{{template}}</option>
</select>
        </div>
      </div>
      
 

      <div class="field">
        <label class="label">Template</label>
        <div class="control">

            <div class="columns  buttons are-small mb-0 pb-0">
            <div class="column mb-0 pb-0">
                <div class="field has-addons">
                <p class="control">
                    <button class="button mb-0 " @click.prevent="insertTextAtCaret('{{name}}')">name</button> 
                </p>
                <p class="control pb-0">
                    <button class="button mb-0 " @click.prevent="insertTextAtCaret('{{snakeCase name}}')">name_snake_case</button> 
                </p>
                <p class="control pb-0">
                    <button class="button mb-0 " @click.prevent="insertTextAtCaret('{{pascalCase name}}')">NameCapitalized</button> 
                </p>
                <p class="control pb-0">
                    <button class="button mb-0 " @click.prevent="insertTextAtCaret('{{camelCase name}}')">nameCamelCase</button> 
                </p>         
            </div>  
            </div>
            <div class="column mb-0 pb-0">    
                <button class="button mb-0 " @click.prevent="insertTextAtCaret('{{dataType}}')">DataType</button> 
                <button class="button mb-0 " @click.prevent="insertTextAtCaret('{{phpDataType dataType nullable}}')">PHP DataType</button> 
            </div>  
            <div class="column mb-0 pb-0">
                <button class="button mb-0 " @click.prevent="insertTextAtCaret('{{#each columns}}\n\n{{/each}}')">Loop</button> 
                <button class="button mb-0 " @click.prevent="insertTextAtCaret('{{#unless @first}},{{/unless}}')">First Only</button> 
                <button class="button mb-0 " @click.prevent="insertTextAtCaret('{{#unless @last}},{{/unless}}')">Not Last</button> 
            </div>
        </div>
        <textarea ref="template" v-model="template" class="template"></textarea>
        <a target="_blank" href="https://handlebarsjs.com/guide/expressions.html">syntax help</a>
        </div>
      </div>

     
      
      <div class="columns">
        <button class="button m-2" @click.prevent="generate">Generate</button> 
            <button class="button  m-2" @click.prevent="ai">Open AI</button> 
                <input v-model="apiKey" class="input is-small  m-2" type="text" placeholder="Open API Key" />
       
        </div>
    </div>


    <!-- <div id="item-1">Schema or Data</div> -->

    <!-- <div id="item-1"><button>save template</button></div>-->

    <div class="container">
    <pre class="result mt-2" ><code v-html="result"></code></pre>
    <button  class="button copy" @click="copy">copy to clipboard</button>
    </div>
    
    </div>
  </div>
</div>
</template>

<script>
import MySqlConnection from './MySqlConnection.vue'
import ipc from '../utils/ipc'
import highlight from 'highlight.js';
import 'highlight.js/styles/stackoverflow-light.css'
export default {
    name: 'HelloWorld',
    components: {MySqlConnection},
    props: {
        msg: String
    },
    computed:{
        error(){
            return this.$store.getters['app/error']
        },
        tables(){
            return this.$store.getters['source/tables']
        },
        templates(){
            return this.$store.getters['templates/templates']
        }
    },
    data: function () {
        return {
            table: '',
            template: '',
            result: '',
            code: '',
            apiKey: ''
        };
    },
    methods: {
        async ai(){

            this.$store.commit('app/loading', true);
            try{
                let columns = await this.$store.dispatch('source/getColumns', this.table);

                columns.name = this.table

                // save the connection
                let code = await ipc.call({
                    command: 'compile',
                    template: this.template,
                    data: {
                        name: this.table,
                        columns
                    }
                })

                this.result = 'asking open ai...\n\n' + code;

                const { Configuration, OpenAIApi } = require("openai");
                const configuration = new Configuration({
                    apiKey: this.apiKey,
                });
                const openai = new OpenAIApi(configuration);
                const response = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: code ,
                    temperature: 0,
                    max_tokens: 1000,
                });
                this.result = highlight.highlightAuto(response.data.choices[0].text).value;
            }finally{
                this.$store.commit('app/loading', false);
            }
        },

        async generate(){

            let columns = await this.$store.dispatch('source/getColumns', this.table);

            columns.name = this.table

            // save the connection
            this.code = await ipc.call({
                command: 'compile',
                template: this.template,
                data: {
                    name: this.table,
                    columns
                }
            })

            this.result = highlight.highlightAuto(this.code).value
        },
        clearError(){
            this.$store.commit('app/clearError');
        },
        copy(){
            navigator.clipboard.writeText(this.code )
        },
        async loadTemplate(template){
            this.template = await this.$store.dispatch('templates/getTemplate', template); 
        },

        insertTextAtCaret(text) {
            let textArea = this.$refs.template;
            let currentValue = textArea.value;
            let currentPos = textArea.selectionStart;
            let newValue = currentValue.substring(0, currentPos) + text + currentValue.substring(textArea.selectionEnd);
            textArea.value = newValue;
            textArea.focus();
            textArea.selectionStart = textArea.selectionEnd = currentPos + text.length;
            this.template = newValue;
        }
    },
    async mounted(){
        await this.$store.dispatch('source/restore')
        await this.$store.dispatch('templates/getTemplates')
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.grid{
    display: grid;
    grid-template-columns: .1fr 1fr;
    grid-column-gap: 10px;

}

.container{
    width: 100%;
    display: block;
    text-align: left;;

}
textarea{
  height:100%;
  width:100%;
  min-height: 25vh;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

textarea.template{
    height: 100%;
}

.result{
    text-align: left;
    min-height: 25vh;
}

.copy{
    position: absolute;
    right: 10px;
    top: 10px;
}

.hidden{
    display:none
}

</style>
