export default function LoadingMediaList() {
  return (
    <div className="animate-pulse flex flex-col gap-8 ml-20 -mr-20">
        <div className="w-52 h-8 bg-gray-300 rounded-sm mb-4"></div>
        <div className="grid grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-gray-300 h-[300px]">
            </div>
            ))}
        </div>
    </div>
)}