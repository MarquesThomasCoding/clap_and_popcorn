import { JSX } from "react";

export default function SignInLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {children}
        </div>
    )
}