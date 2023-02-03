
import handlebars from 'handlebars'
import phpMapping from './generator/mapping/php'


import {
    camelCase,
    capitalCase,
    constantCase,
    dotCase,
    headerCase,
    noCase,
    paramCase,
    pascalCase,
    pathCase,
    sentenceCase,
    snakeCase,
  } from "change-case";



handlebars.registerHelper('braces', function(text) {
    let result = '{{' + text + '}}';
    return new handlebars.SafeString(result);
});
handlebars.registerHelper('camelCase', function(text) {
    return new handlebars.SafeString(camelCase(text));
});
handlebars.registerHelper('capitalCase', function(text) {
    return new handlebars.SafeString(capitalCase(text));
});
handlebars.registerHelper('constantCase', function(text) {
    return new handlebars.SafeString(constantCase(text));
});
handlebars.registerHelper('dotCase', function(text) {
    return new handlebars.SafeString(dotCase(text));
});
handlebars.registerHelper('headerCase', function(text) {
    return new handlebars.SafeString(headerCase(text));
});
handlebars.registerHelper('noCase', function(text) {
    return new handlebars.SafeString(noCase(text));
});
handlebars.registerHelper('paramCase', function(text) {
    return new handlebars.SafeString(paramCase(text));
});
handlebars.registerHelper('pascalCase', function(text) {
    return new handlebars.SafeString(pascalCase(text));
});
handlebars.registerHelper('pathCase', function(text) {
    return new handlebars.SafeString(pathCase(text));
});
handlebars.registerHelper('sentenceCase', function(text) {
    return new handlebars.SafeString(sentenceCase(text));
});
handlebars.registerHelper('snakeCase', function(text) {
    return new handlebars.SafeString(snakeCase(text));
});
handlebars.registerHelper('phpDataType', function(text, nullable) {
    return new handlebars.SafeString(phpMapping.map(text, nullable));
});

function compile(template, data){
    const hbTemplate = handlebars.compile(template)
    return hbTemplate(data)
}

export default {
    compile
}