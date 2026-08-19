import type { FormSubmitStatus } from "./types";

interface FormSubmitStatusMessageProps {
  status: FormSubmitStatus;
  successMessage: string;
}

export function FormSubmitStatusMessage({
  status,
  successMessage,
}: FormSubmitStatusMessageProps) {
  if (status.status === "success") {
    return (
      <p
        role="status"
        className="mt-4 text-center text-sm font-medium text-[#B58544]"
      >
        {successMessage}
      </p>
    );
  }

  if (status.status === "error") {
    return (
      <p
        role="alert"
        className="mt-4 text-center text-sm font-medium text-red-500"
      >
        {status.message}
      </p>
    );
  }

  return null;
}
