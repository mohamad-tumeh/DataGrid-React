import Papa from 'papaparse';

export const parseCSV = (csvPath: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvPath, {
      download: true,
      header: true,
      complete: (result) => {
        if (result.errors.length) {
          reject(result.errors);
        } else {
          resolve(result.data);
        }
      },
      error: (error) => {
        reject(error.message);
      },
    });
  });
};
