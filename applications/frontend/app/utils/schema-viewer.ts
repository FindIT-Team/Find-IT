import * as z from 'zod';

export function schemaViewer(schema: z.ZodType): string[] {
  // Adjusted: Signature now uses z.zType to eliminate null& undefined check
  // check if schema is nullable or optional
  if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional) {
    return schemaViewer(schema.unwrap());
  }
  // check if schema is an array
  if (schema instanceof z.ZodArray) {
    return schemaViewer(schema.element);
  }
  // check if schema is an object
  if (schema instanceof z.ZodObject) {
    // get key/value pairs from schema
    const entries = Object.entries<z.ZodType>(schema.shape); // Adjusted: Uses z.zType as generic to remove instanceof check. Since .shape returns zRawShape which has z.zType as type for each key.
    // loop through key/value pairs
    return entries.flatMap(([key, value]) => {
      // get nested keys
      const nested = schemaViewer(value).map((subKey) => `${key}.${subKey}`);
      // return nested keys
      return nested.length ? nested : key;
    });
  }
  // return empty array
  return [];
}
