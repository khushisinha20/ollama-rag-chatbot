import React, { useState } from 'react'
import Chat from './components/Chat'
import FileUpload from './components/FileUpload'

function App() {
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Document Q&A Assistant
      </h1>
      <FileUpload onUploadSuccess={setIsDocumentUploaded} />
      <div className="mt-8">
        <Chat isDocumentUploaded={isDocumentUploaded} />
      </div>
    </div>
  )
}

export default App
