import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { cn } from "@/util/cn";
import { FC } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import default styles

interface FloatingLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  input_name: string;
  type: string;
  className?: string;
}

export const FloatingLabel: FC<FloatingLabelProps> = ({ input_name, type, className }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Render the appropriate input field based on type
  const renderInput = () => {
    if (type === "tel") {
      return (
        <div         className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer">
        <PhoneInput
          country={'us'}
          placeholder=" "
        />
        </div>
      );
    }
    return (
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer"
        placeholder=" "
      />
    );
  };

  return (
    <div className={cn("relative", className)}>
      {renderInput()}
      <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
        {input_name}
      </label>
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
        >
          {showPassword ? (
            <AiFillEyeInvisible className="text-gray-500" />
          ) : (
            <AiFillEye className="text-gray-500" />
          )}
        </button>
      )}
    </div>
  );
};
