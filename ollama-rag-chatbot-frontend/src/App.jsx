import React, { useState } from 'react';
import Chat from './components/Chat';
import FileUpload from './components/FileUpload';

function App() {
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <FileUpload onUploadSuccess={setIsDocumentUploaded} />
      <Chat isDocumentUploaded={isDocumentUploaded} />
    </div>
  );
}

export default App;