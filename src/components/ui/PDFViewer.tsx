'use client';

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FiX, FiChevronLeft, FiChevronRight, FiDownload } from 'react-icons/fi';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf-worker/pdf.worker.min.js';

interface PDFViewerProps {
  url: string;
  fileName: string;
  onClose: () => void;
}

export default function PDFViewer({ url, fileName, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.5);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const nextPage = () => {
    if (pageNumber < (numPages || 0)) {
      setPageNumber(pageNumber + 1);
    }
  };

  const previousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white">{fileName}</h3>
            <p className="text-gray-400">
              Page {pageNumber} of {numPages}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={url}
              download={fileName}
              className="flex items-center gap-2 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 px-4 py-2 rounded-full transition-colors"
            >
              <FiDownload />
              Download
            </a>
            <button
              onClick={onClose}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-full transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto min-h-0 relative bg-white/5 rounded-2xl p-4">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
              </div>
            }
            error={
              <div className="flex items-center justify-center h-full text-red-400">
                Failed to load PDF. Please try downloading instead.
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              loading={
                <div className="flex items-center justify-center h-[800px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
                </div>
              }
            />
          </Document>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={previousPage}
            disabled={pageNumber <= 1}
            className="bg-violet-500/20 hover:bg-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-violet-300 p-2 rounded-full transition-colors"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextPage}
            disabled={pageNumber >= (numPages || 0)}
            className="bg-violet-500/20 hover:bg-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-violet-300 p-2 rounded-full transition-colors"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
} 