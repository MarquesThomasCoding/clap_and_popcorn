import { LoaderCircle } from 'lucide-react';

export default function Loader({ message }: { message: string }) {
  return (
    <div className='flex gap-2'>
      <LoaderCircle className="animate-spin h-8 w-8"/>
      <span className="animate-pulse">{message}</span>
    </div>
  )
}
