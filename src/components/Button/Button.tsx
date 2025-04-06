import { cn } from "../../utils/helpers.utils";

interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  title?: string;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
  type?: "button" | "submit" | "reset";
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const Button = ({
  title = "",
  className,
  variant = "primary",
  type = "button",
  rightIcon,
  leftIcon,
  children,
  ...rest
}: IButtonProps) => {
  return (
    <button
      title={title}
      className={cn(
        "w-full cursor-pointer",
        {
          "rounded-full bg-[#131316] text-white font-semibold":
            variant === "primary",
          "rounded-full bg-[#EFF1F6] font-semibold text-[#131316]":
            variant === "secondary",
          "rounded-full bg-white border border-[#EFF1F6] text-[#131316] font-semibold":
            variant === "tertiary"
        },
        className
      )}
      type={type}
      {...rest}
    >
      <span className="flex items-center gap-1 justify-center">
        {leftIcon}
        {title}
        {children}
        {rightIcon}
      </span>
    </button>
  );
};

export default Button;
