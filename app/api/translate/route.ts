import { postmanToBruno } from '@usebruno/converters';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { script } = await request.json();

    if (!script || script.trim() === '') {
      return NextResponse.json({ translatedScript: script });
    }

    // Wrap the script in a minimal Postman collection structure
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

    return NextResponse.json({
      translatedScript: outputScript || script
    });
  } catch (e) {
    console.error('Error translating Postman script:', e);
    return NextResponse.json(
      { error: 'Translation failed', translatedScript: '' },
      { status: 500 }
    );
  }
}
