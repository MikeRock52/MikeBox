import React, { useState } from 'react';
import { Copy } from '../Icons';

function FileShare({ text }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {setIsCopied(false)}, 10000);
    } catch (err) {
      console.error('Copy to clipboard failed:', err);
    }
  };

  return (
    <div className='relative text-start bg-lime-100 py-2 w-full rounded mt-2'>
      <span className="mx-2">{text}</span>
      <button className="absolute top-0 right-0 bg-lime-200 p-2" onClick={copyToClipboard}>
        {isCopied ? 'Copied!' : Copy()}
      </button>
    </div>
  );
}

export default FileShare;
