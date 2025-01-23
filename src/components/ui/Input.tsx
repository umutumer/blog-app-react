import { InputHTMLAttributes, FC, forwardRef, useState } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../libs/utils';

interface InputProps { }

const inputVariants = cva(
  "px-4 py-2 font-medium text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
  {
    variants: {
      variant: {
        default: "bg-white",
        outline: "bg-transparent border-gray-400 text-gray-700 focus:bg-white",
        file: "flex items-center bg-white border border-gray-300 rounded-lg",
      },
      sizes: {
        default: "w-64 h-10",
        sm: "w-40 h-8",
        md: "w-56 h-10",
        lg: "w-80 h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      sizes: "default",
    },
  }
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, sizes, variant, ...props }, ref) => {
    const [fileName, setFileName] = useState("Dosya seçilmedi");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setFileName(event.target.files[0].name);
      } else {
        setFileName("Dosya seçilmedi");
      }
    };

    if (variant === "file") {
      return (
        <div
          className={cn(
            "relative flex items-center border border-gray-300 rounded-lg overflow-hidden",
            inputVariants({ variant, sizes, className })
          )}
        >
          <label
            className="flex justify-center items-center w-1/2 h-full bg-white text-gray-700 font-medium cursor-pointer border-r border-gray-300"
          >
            Dosya Seç
            <input
              type="file"
              ref={ref}
              className="hidden"
              onChange={handleFileChange}
              {...props}
            />
          </label>
          <div className="flex-grow h-full px-1 text-gray-500 text-sm">
            {fileName}
          </div>
        </div>
      );
    }
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ variant, sizes, className }))}
        {...props}
      />
    );
  }
);

export { Input, inputVariants };
