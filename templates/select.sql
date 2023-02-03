UPDATE {{name}}
SET
{{#each columns}}
	{{name}}{{#unless @last}} = ?,{{/unless}}
{{/each}}
WHERE
	id = ?
	

