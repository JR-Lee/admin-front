export default interface ElFormI {
  validate: () => Promise<void>;
  validateField: (field: string, callback?: (errorMessage: string) => void) => void;
  resetFields: () => void;
  clearValidate: (props: string[] | string) => void;
  [key: string]: unknown;
}