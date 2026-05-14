/**
 * Postman → Bruno script translator UI for the Mintlify docs.
 *
 * The actual translation logic lives in @usebruno/converters and is
 * pre-bundled into a self-contained browser JS file at
 *   /public/js/bruno-translator/bruno-translator.js
 *
 * That bundle (built from /public/translator-bundle/) sets
 * `window.__brunoTranslator.postmanTranslation` when it loads, which
 * guarantees this docs translator and the actual Bruno desktop app's
 * Postman import feature use the EXACT same conversion logic.
 *
 * To rebuild the bundle after a @usebruno/converters version bump:
 *   npm run build:translator
 *
 * See /public/translator-bundle/README.md for details.
 */

const TRANSLATOR_BUNDLE_URL = '/public/js/bruno-translator/bruno-translator.js';

export const Translator = () => {
  const [mounted, setMounted] = useState(false);
  const [translatorReady, setTranslatorReady] = useState(false);
  const [translatorError, setTranslatorError] = useState(null);
  const [pmCode, setPmCode] = useState('// translate your awesome code');
  const [translatedCode, setTranslatedCode] = useState('');
  const [layoutMode, setLayoutMode] = useState('col');
  const [editorTheme, setEditorTheme] = useState('dark');

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    const savedPmCode = localStorage.getItem('pmCode');
    if (savedPmCode) setPmCode(savedPmCode);

    if (window.__brunoTranslator?.postmanTranslation) {
      setTranslatorReady(true);
      return;
    }

    const existing = document.querySelector(`script[data-bruno-translator]`);
    if (existing) {
      const onReady = () => setTranslatorReady(true);
      window.addEventListener('bruno-translator-ready', onReady, { once: true });
      return () => window.removeEventListener('bruno-translator-ready', onReady);
    }

    const script = document.createElement('script');
    script.src = TRANSLATOR_BUNDLE_URL;
    script.async = true;
    script.dataset.brunoTranslator = 'true';
    script.onload = () => {
      if (window.__brunoTranslator?.postmanTranslation) {
        setTranslatorReady(true);
      } else {
        setTranslatorError(
          'Translator bundle loaded but did not expose window.__brunoTranslator.'
        );
      }
    };
    script.onerror = () => {
      setTranslatorError(
        `Failed to load translator bundle from ${TRANSLATOR_BUNDLE_URL}. ` +
          `Make sure you have run "npm run build:translator".`
      );
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!mounted || !translatorReady) return;
    try {
      const output = window.__brunoTranslator.postmanTranslation(pmCode);
      setTranslatedCode(output ?? '');
    } catch (e) {
      console.error('Translation error:', e);
      setTranslatedCode(pmCode);
    }
  }, [pmCode, mounted, translatorReady]);

  const savePmCode = (code) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pmCode', code);
    }
    setPmCode(code);
  };

  const copyClipboard = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(translatedCode).then(() => {
        const toast = document.createElement('div');
        toast.textContent = 'Copied to clipboard!';
        toast.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #4F46E5;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          z-index: 10000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          font-size: 14px;
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast);
          }
        }, 2000);
      });
    }
  };

  const isRowMode = layoutMode === 'row';
  const isDark = editorTheme === 'dark';
  const bgColor = isDark ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDark ? '#D4D4D4' : '#000000';
  const borderColor = isDark ? '#3E3E3E' : '#E5E7EB';

  if (!mounted) {
    return (
      <div style={{ width: '100%', padding: '2rem', textAlign: 'center', color: '#666' }}>
        Loading translator...
      </div>
    );
  }

  return (
    <div style={{ width: '100%', marginTop: '1rem', marginBottom: '2rem' }}>
      {translatorError && (
        <div style={{
          padding: '0.75rem 1rem',
          marginBottom: '1rem',
          backgroundColor: '#7F1D1D',
          color: '#FCA5A5',
          borderRadius: '0.5rem',
          fontSize: '0.875rem'
        }}>
          {translatorError}
        </div>
      )}

      {!translatorReady && !translatorError && (
        <div style={{
          padding: '0.75rem 1rem',
          marginBottom: '1rem',
          backgroundColor: isDark ? '#2D2D2D' : '#F3F4F6',
          color: textColor,
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          border: `1px solid ${borderColor}`
        }}>
          Loading the @usebruno/converters translation engine…
        </div>
      )}

      {/* Toolbar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        padding: '0.75rem',
        backgroundColor: isDark ? '#2D2D2D' : '#F9FAFB',
        borderRadius: '0.5rem',
        border: `1px solid ${borderColor}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '500', color: textColor, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Theme:
            <select
              value={editorTheme}
              onChange={(e) => setEditorTheme(e.target.value)}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '0.375rem',
                border: `1px solid ${borderColor}`,
                fontSize: '0.875rem',
                backgroundColor: bgColor,
                color: textColor,
                cursor: 'pointer'
              }}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </label>

          <div style={{ display: 'flex', gap: '0.25rem', border: `1px solid ${borderColor}`, borderRadius: '0.375rem', padding: '0.125rem' }}>
            <button
              onClick={() => setLayoutMode('col')}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '0.25rem',
                border: 'none',
                backgroundColor: layoutMode === 'col' ? '#4F46E5' : 'transparent',
                color: layoutMode === 'col' ? 'white' : textColor,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
              title="Column Layout"
            >
              ⬍ Column
            </button>
            <button
              onClick={() => setLayoutMode('row')}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '0.25rem',
                border: 'none',
                backgroundColor: layoutMode === 'row' ? '#4F46E5' : 'transparent',
                color: layoutMode === 'row' ? 'white' : textColor,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
              title="Row Layout"
            >
              ⬌ Row
            </button>
          </div>
        </div>

        <button
          onClick={copyClipboard}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: isDark ? '#3F3F46' : '#E4E4E7',
            color: isDark ? '#FAFAFA' : '#18181B',
            border: `1px solid ${borderColor}`,
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = isDark ? '#52525B' : '#D4D4D8';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = isDark ? '#3F3F46' : '#E4E4E7';
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copy Bruno Code
        </button>
      </div>

      {/* Editor Layout */}
      <div style={{
        display: 'flex',
        flexDirection: isRowMode ? 'row' : 'column',
        gap: '0.5rem',
        border: `1px solid ${borderColor}`,
        borderRadius: '0.5rem',
        overflow: 'hidden',
        backgroundColor: bgColor,
        minHeight: isRowMode ? '500px' : '600px'
      }}>
        {/* Postman Editor */}
        <div style={{
          flex: 1,
          position: 'relative',
          borderRight: isRowMode ? `1px solid ${borderColor}` : 'none',
          borderBottom: !isRowMode ? `1px solid ${borderColor}` : 'none',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '0.1rem 0.5rem',
            backgroundColor: isDark ? '#252526' : '#F3F4F6',
            borderBottom: `1px solid ${borderColor}`,
            fontSize: '0.75rem',
            fontWeight: '600',
            color: textColor,
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem'
          }}>
            <img
              src="/images/postman.svg"
              alt="Postman"
              style={{
                height: '18px',
                width: '17px',
                display: 'block'
              }}
            />
            <span>Postman Script</span>
          </div>
          <textarea
            value={pmCode}
            onChange={(e) => savePmCode(e.target.value)}
            style={{
              flex: 1,
              width: '100%',
              padding: '0.75rem',
              fontFamily: '"Fira Code", "Consolas", "Monaco", "Courier New", monospace',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              border: 'none',
              outline: 'none',
              resize: 'none',
              backgroundColor: bgColor,
              color: textColor
            }}
            placeholder="Paste your Postman script here..."
            spellCheck={false}
          />
        </div>

        {/* Bruno Editor */}
        <div style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '0.1rem 0.5rem',
            backgroundColor: isDark ? '#252526' : '#F3F4F6',
            borderBottom: !isRowMode ? `1px solid ${borderColor}` : 'none',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: textColor,
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem'
          }}>
            <img
              src="/images/bruno.svg"
              alt="Bruno"
              style={{
                height: '18px',
                width: '18px',
                display: 'block'
              }}
            />
            <span>Bruno Script</span>
          </div>
          <textarea
            value={translatedCode}
            readOnly
            style={{
              flex: 1,
              width: '100%',
              padding: '0.75rem',
              fontFamily: '"Fira Code", "Consolas", "Monaco", "Courier New", monospace',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              border: 'none',
              outline: 'none',
              resize: 'none',
              backgroundColor: bgColor,
              color: textColor
            }}
            placeholder={
              translatorReady
                ? 'Translated Bruno script will appear here...'
                : 'Waiting for translator engine to load...'
            }
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};
