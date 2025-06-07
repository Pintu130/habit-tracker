import toast from 'react-hot-toast';
import { CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx'; // Optional, for better conditional class handling (you can skip if not using it)

export const ShowCustomToast = (type: 'success' | 'error', message: string) => {
  toast.custom((t) => (
    <div
      className={clsx(
        'max-w-sm w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg border p-4 flex items-start space-x-3 transition-all duration-300',
        {
          'border-green-500': type === 'success',
          'border-red-500': type === 'error',
        }
      )}
    >
      <div className="mt-1">
        {type === 'success' ? (
          <CheckCircle className="text-green-500" size={24} />
        ) : (
          <XCircle className="text-red-500" size={24} />
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {type === 'success' ? 'Success' : 'Error'}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
      </div>
      <button onClick={() => toast.dismiss(t.id)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
        ✕
      </button>
    </div>
  ));
};
