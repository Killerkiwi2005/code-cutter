<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\\{{pascalCase name}}
 *
{{#each columns}}
 * @property {{dataType}} ${{snakeCase name}}
{{/each}}
 */
class {{pascalCase name}} extends Model
{
    protected $casts = [
{{#each columns}}
	'{{snakeCase name}}' => '{{dataType}}',
{{/each}}
    ];
    
    protected $fillable = [
{{#each columns}}
	'{{snakeCase name}}',
{{/each}}
    ];
}


