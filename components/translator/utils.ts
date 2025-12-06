// Simplified Postman to Bruno script translator
// This is a lightweight version that handles the most common conversions
// without relying on the full @usebruno/converters package

export const postmanTranslation = async (script: string): Promise<string> => {
  if (!script || script.trim() === '') {
    return script;
  }

  try {
    let translatedScript = script;

    // Basic Postman to Bruno API conversions
    const conversions = [
      // Test function conversions
      {
        pattern: /pm\.test\s*\(\s*["'`]([^"'`]+)["'`]\s*,\s*function\s*\(\s*\)\s*\{/g,
        replacement: 'test("$1", function() {'
      },

      // Response status conversions
      {
        pattern: /pm\.response\.to\.have\.status\((\d+)\)/g,
        replacement: 'expect(res.getStatus()).to.equal($1)'
      },

      // Response body JSON access
      {
        pattern: /pm\.response\.json\(\)/g,
        replacement: 'res.getBody()'
      },

      // Environment variable operations
      {
        pattern: /pm\.environment\.set\s*\(\s*["'`]([^"'`]+)["'`]\s*,\s*([^)]+)\)/g,
        replacement: 'bru.setEnvVar("$1", $2)'
      },
      {
        pattern: /pm\.environment\.get\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
        replacement: 'bru.getEnvVar("$1")'
      },

      // Global variable operations
      {
        pattern: /pm\.globals\.set\s*\(\s*["'`]([^"'`]+)["'`]\s*,\s*([^)]+)\)/g,
        replacement: 'bru.setVar("$1", $2)'
      },
      {
        pattern: /pm\.globals\.get\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
        replacement: 'bru.getVar("$1")'
      },

      // Collection variable operations
      {
        pattern: /pm\.collectionVariables\.set\s*\(\s*["'`]([^"'`]+)["'`]\s*,\s*([^)]+)\)/g,
        replacement: 'bru.setVar("$1", $2)'
      },
      {
        pattern: /pm\.collectionVariables\.get\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
        replacement: 'bru.getVar("$1")'
      },

      // Response time assertions
      {
        pattern: /pm\.expect\s*\(\s*pm\.response\.responseTime\s*\)\.to\.be\.below\s*\(\s*(\d+)\s*\)/g,
        replacement: 'expect(res.getResponseTime()).to.be.below($1)'
      },

      // Response header assertions
      {
        pattern: /pm\.response\.to\.have\.header\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
        replacement: 'expect(res.getHeader("$1")).to.exist'
      },

      // Response body text
      {
        pattern: /pm\.response\.text\(\)/g,
        replacement: 'res.getBody()'
      },

      // Basic expect conversions
      {
        pattern: /pm\.expect\s*\(\s*([^)]+)\s*\)\.to\.eql\s*\(\s*([^)]+)\s*\)/g,
        replacement: 'expect($1).to.equal($2)'
      },
      {
        pattern: /pm\.expect\s*\(\s*([^)]+)\s*\)\.to\.equal\s*\(\s*([^)]+)\s*\)/g,
        replacement: 'expect($1).to.equal($2)'
      },

      // Response size
      {
        pattern: /pm\.response\.responseSize/g,
        replacement: 'res.getSize()'
      }
    ];

    // Apply all conversions
    conversions.forEach(({ pattern, replacement }) => {
      translatedScript = translatedScript.replace(pattern, replacement);
    });

    return translatedScript;
  } catch (error) {
    console.error('Translation error:', error);
    return script; // Return original script if translation fails
  }
};

export const transformThemeName = (name: string) => {
  return name
    .replace(/ /g, '-')
    .replace(/[()]/g, "")
    .toLowerCase()
}

export const prettifyName = (name: string) => {
  return name
    .replace(/-/g, ' ')
    .replace(/vs/g, 'VS')
    .replace(/dark/g, 'Dark')
    .replace(/light/g, 'Light')
    // capitalize the first letter of each word
    .replace(/\b\w/g, (char) => char.toUpperCase())
}