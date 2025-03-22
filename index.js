import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function PastebinClone() {
  const [text, setText] = useState("");
  const [pastes, setPastes] = useState({});
  const [currentId, setCurrentId] = useState(null);

  const createPaste = () => {
    const id = uuidv4();
    setPastes(prev => ({ ...prev, [id]: text }));
    setCurrentId(id);
    setText("");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Pastebin Clone</h1>
      <textarea
        className="w-full p-2 border rounded mt-2"
        rows="5"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
      />
      <button onClick={createPaste} className="mt-2 p-2 bg-blue-500 text-white rounded">
        Create Paste
      </button>

      {currentId && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <p>Paste URL:</p>
          <a
            href={`#${currentId}`}
            className="text-blue-600 break-all"
          >
            {window.location.href.split("#")[0]}#{currentId}
          </a>
        </div>
      )}

      {window.location.hash.slice(1) && pastes[window.location.hash.slice(1)] && (
        <pre className="mt-4 p-4 border rounded bg-white shadow">
          {pastes[window.location.hash.slice(1)]}
        </pre>
      )}
    </div>
  );
}
