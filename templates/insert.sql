SELECT
    {{#each columns}}
	{{name}}{{#unless @last}},{{/unless}}
    {{/each}}
FROM
	{{name}}

