public class {{pascalCase name}}
{
{{#each columns}}
    public {{csharpDataType dataType nullable}} {{pascalCase name}} { get; set; }
{{/each}}
}