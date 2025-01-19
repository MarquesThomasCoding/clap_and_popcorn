import { JSX } from "react";

export default function LoadingBanner(): JSX.Element {
  return (
    <div className="flex flex-col justify-end h-screen p-8 mx-20 mb-140">
      <div className="animate-pulse flex flex-col gap-8">
        <div className="w-52 h-16 bg-gray-300 rounded-sm mb-4"></div>
        <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-96 h-1 bg-gray-300 rounded"></div>
            ))}
        </div>
        <div className="flex gap-4">
            <div className="w-52 h-12 bg-gray-300 rounded"></div>
            <div className="w-52 h-12 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  )
}