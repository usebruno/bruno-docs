const replacements = {
  'pm\\.environment\\.get\\(': 'bru.getEnvVar(',
  'pm\\.environment\\.set\\(': 'bru.setEnvVar(',
  'pm\\.variables\\.get\\(': 'bru.getVar(',
  'pm\\.variables\\.set\\(': 'bru.setVar(',
  'pm\\.collectionVariables\\.get\\(': 'bru.getVar(',
  'pm\\.collectionVariables\\.set\\(': 'bru.setVar(',
  'pm\\.setNextRequest\\(': 'bru.setNextRequest(',
  'pm\\.test\\(': 'test(',
  'pm.response.to.have\\.status\\(': 'expect(res.getStatus()).to.equal(',
  'pm\\.response\\.to\\.have\\.status\\(': 'expect(res.getStatus()).to.equal(',
  'pm\\.response\\.json\\(': 'res.getBody(',
  'pm\\.expect\\(': 'expect(',
  'pm\\.environment\\.has\\(([^)]+)\\)': 'bru.getEnvVar($1) !== undefined && bru.getEnvVar($1) !== null',
  'pm\\.response\\.code': 'res.getStatus()',
  'pm\\.response\\.text\\(': 'res.getBody()?.toString('
};

const compiledReplacements = Object.entries(replacements).map(([pattern, replacement]) => ({
  regex: new RegExp(pattern, 'g'),
  replacement
}));

export const utils = (script: string) => {
  try {
    let modifiedScript = script;
    for (const { regex, replacement } of compiledReplacements) {
      if (regex.test(modifiedScript)) {
        modifiedScript = modifiedScript.replace(regex, replacement);
      }
    }
    if (modifiedScript.includes('pm.')) {
      modifiedScript = modifiedScript.replace(/^(.*pm\..*)$/gm, '// $1');
    }
    return modifiedScript;
  } catch (e) {
    return script;
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