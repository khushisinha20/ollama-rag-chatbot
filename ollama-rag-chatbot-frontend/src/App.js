import { useState } from 'react';
import './App.css';
import Chat from './components/Chat';

function App() {
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Chat isDocumentUploaded={isDocumentUploaded} />
    </div>
  );
}

export default App;
