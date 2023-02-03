
// map datatypes to c# datatypes
function mapToCSharp(dataType) {
    switch ((dataType || '').toLowerCase()) {
      case "tinyint":
        return "byte";
      case "smallint":
        return "short";
      case "mediumint":
      case "int":
        return "int";
      case "bigint":
        return "long";
      case "float":
        return "float";
      case "double":
        return "double";
      case "decimal":
        return "decimal";
      case "date":
      case "datetime":
      case "timestamp":
        return "DateTime";
      case "time":
        return "TimeSpan";
      case "year":
        return "short";
      case "char":
        return "char";
      case "binary":
      case "varbinary":
      case "blob":
      case "tinyblob":
      case "mediumblob":
      case "longblob":
        return "byte[]";
      case "tinytext":
      case "mediumtext":
      case "longtext":
      case "enum":
      case "set":
      case "varchar":
      case "text":
      case "json":          
        return "string";
      case "bit":
      case "bool":
        return "bool";
      default:
        return 'unknown (' + dataType + ')';
    }
  }

function map(dataType, nullable) {
    let type = mapToCSharp(dataType)
    return nullable ? type + '?' : type;
}

export default {
    name: "C# Datatype mapping",
    map
}