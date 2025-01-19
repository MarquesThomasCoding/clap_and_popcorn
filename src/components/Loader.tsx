import { LoaderCircle } from 'lucide-react';
import { JSX } from 'react';

export default function Loader({ message }: { message: string }): JSX.Element {
  return (
    <div className='flex gap-2'>
      <LoaderCircle className="animate-spin h-8 w-8"/>
      <span className="animate-pulse">{message}</span>
    </div>
  )
}
