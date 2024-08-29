import { Id, toast } from "react-toastify"


export const loadToast = (message: string) => {
    const toastId = toast.loading(message, {
      position: "top-center",
      className: "text-white bg-slate-900 border border-gray-800",
    });
    return toastId;
  };
  
  export const updateToast = (toastId: Id, message: string, type: string) => {
    toast.update(toastId, {
      render: message,
      type: type as any,
      isLoading: false,
      position: "top-center",
      className: "text-white bg-slate-900 border border-gray-800",
      autoClose: 2000,
    });
  };
  