export const postmanTranslation = async (script: string): Promise<string> => {
  if (!script || script.trim() === '') {
    return script;
  }

  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ script }),
    });

    if (!response.ok) {
      console.error('Translation API error:', response.status);
      return script;
    }

    const data = await response.json();
    return data.translatedScript || script;
  } catch (e) {
    console.error('Error translating Postman script:', e);
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
