
// map datatypes to php datatypes
function map(dataType, nullable) {
    switch ((dataType || '').toLowerCase()) {
    case 'int':
    case 'tinyint':
    case 'smallint':
    case 'mediumint':
    case 'bigint':
        return nullable ? '?int' : 'int';
    case 'float':
    case 'double':
    case 'decimal':            
        return nullable ? '?float' : 'float';
    case 'char':
    case 'varchar':
    case 'tinytext':
    case 'text':
    case 'mediumtext':
    case 'longtext':
    case 'string': 
    case 'json':           
        return nullable ? '?string' : 'string';
    case 'date':
    case 'datetime':
    case 'timestamp':
        return nullable ? '?Carbon' : 'Carbon';
    default:
        return 'unknown (' + dataType + ')';
    }
}

export default {
    name: "PHP Datatype mapping",
    map: map
}