import { useToast } from '@purplelab/atoms-ui/toast/use-toast';
import { checkCsvFileLines } from './check-csv-file-lines';

const HEADER_LINES_CSV_FILE = 1;

export const useValidateFileUpload = () => {
  const { toast } = useToast();

  const validate = async (
    file: ArrayBuffer,
    minLength?: number
  ): Promise<boolean> => {
    try {
      const lineCount = (await checkCsvFileLines(file)) ?? 0;
      const npiLines = lineCount - HEADER_LINES_CSV_FILE;

      if (npiLines <= 0) {
        toast({
          title: 'Invalid File',
          description: 'You must add a non-empty file.',
          variant: 'warning'
        });
        return false;
      }

      if (minLength && npiLines < minLength) {
        toast({
          title: 'Not Enough Data',
          description: `The uploaded file has ${npiLines} NPI's, but at least ${minLength} are required`,
          variant: 'warning'
        });
        return false;
      }

      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: 'Error Reading File',
        description: `There was a problem processing the CSV file: ${message}`,
        variant: 'warning'
      });
      return false;
    }
  };

  return { validate };
};
