INSERT INTO {{name}} (
{{#each columns}}    {{name}}{{#unless @last}},{{/unless}}
{{/each}}) VALUES (
{{#each columns}}   ?{{name}}{{#unless @last}},{{/unless}}
{{/each}}
);
SELECT LAST_INSERT_ID();

