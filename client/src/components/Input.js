import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const UPLOAD_PDF = gql`
  mutation UploadPDF($file: Upload!) {
    detectPDFType(file: $file) {
      type
      text
    }
  }
`;

function Input() {
  const [file, setFile] = useState(null);
  const [pdfType, setPDFType] = useState(null);

  const [uploadPDF] = useMutation(UPLOAD_PDF);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await uploadPDF({ variables: { file } });
    setPDFType(data.detectPDFType);
  };

  return (
    <div>
      <h1>PDF Detector</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Detect PDF Type</button>
      </form>
      {pdfType && (
        <div>
          <p>Type: {pdfType.type}</p>
          {pdfType.text && <p>Text: {pdfType.text}</p>}
        </div>
      )}
    </div>
  );
}

export default Input;
