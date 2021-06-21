import { ReactNode } from "react";

export default function MotorwayGrid({ children }: { children: ReactNode }) {
    return (
        <div className="max-w-md bg-gray-300 grid grid-cols-5 gap-0 divide-x divide-white divide-dashed">
            {children}
        </div>
    )
}