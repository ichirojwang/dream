import { ReactNode } from "react";

interface Props {
  className?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  children: ReactNode;
}

const Button = ({ className, onClick, type, children }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 text-white px-4 py-2 rounded-lg z-10 ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
