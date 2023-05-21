import React from 'react';
import * as XLSX from 'xlsx';

function DownloadTable({ data, filename,omitKeys }) {
  const handleDownload = () => {
    // Define an array of keys to omit
const keysToOmit = omitKeys

// Create a new array of objects with the specified keys omitted
const recordsWithoutKeys = omitKeys ? data.map(record =>
  Object.fromEntries(
    Object.entries(record).filter(([key]) => !keysToOmit.includes(key))
  )
) : [...data];
    // Convert the data to a worksheet
    const ws = XLSX.utils.json_to_sheet(recordsWithoutKeys);

    // Create a new workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save the workbook as a binary file
    const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

    // Trigger a download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  // Convert a string to an ArrayBuffer
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  };

  return (
    <button onClick={handleDownload}><i className="fa fa-download" aria-hidden="true"></i> &nbsp;&nbsp;Download Excel</button>
  );
}

export default DownloadTable;
