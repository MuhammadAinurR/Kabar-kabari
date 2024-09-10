import { toast } from 'react-toastify';

export default function showToast({ message = "Something went wrong", type = 'error' }) {
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}