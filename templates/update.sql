UPDATE 
    {{name}} 
SET
{{#each columns}}    {{name}} = ?{{name}}{{#unless @last}},{{/unless}}
{{/each}}) 
WHERE
    id = ?id