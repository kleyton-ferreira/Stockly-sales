import { ReactNode } from "react";
import { cn } from "../_lib/utils";

export const HeaderTitle = ({ children }: { children: ReactNode }) => {
  return <h2 className="text-xl font-bold"> {children} </h2>;
};

export const HeaderSubTitle = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm font-bold text-textGreen-primary">{children}</p>;
};

export const HeaderLeft = ({ children }: { children: ReactNode }) => {
  return <div className="space-y-1"> {children} </div>;
};

export const HeaderRight = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-6 flex items-center justify-between">{children}</div>
  );
};

export const HeaderContainer = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-center justify-between">{children}</div>;
};

const Header = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={cn("w-full p-8", className)}>{children} </div>;
};

export default Header;
