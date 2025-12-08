import { postmanToBruno } from '@usebruno/converters';

export const postmanTranslation = async (script: string): Promise<string> => {
  if (!script || script.trim() === '') {
    return script;
  }

  try {
    // The script is expected to be just the "exec" part of a Postman script.
    // We need to wrap it in a minimal Postman collection structure.
    const postmanCollection = {
      info: {
        _postman_id: 'dummy-id-for-translation',
        name: 'dummy-collection',
        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
      },
      item: [],
      event: [
        {
          listen: 'test',
          script: {
            type: 'text/javascript',
            exec: script.split('\n')
          }
        }
      ]
    };

    // Type casting to any to avoid type mismatches with the converter library
    const brunoCollection = await postmanToBruno(postmanCollection as any);
    
    const outputScript = brunoCollection?.root?.request?.script?.res;

    return outputScript || script; // Return original script on failure
  } catch (e) {
    console.error('Error translating Postman script:', e);
    return script; // Return original script on error
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