import { FaHome, FaMusic } from 'react-icons/fa';
import Link from 'next/link';

export default function Nav() {
  return (
    <>
      <div className="sticky flex items-center mx-auto justify-end print:hidden top-0 left-0 right-0 z-[1000] backdrop-blur-sm p-4 bg-white/30 max-w-4xl space-x-4">
        <Link href="/" title="home">
          <FaHome className="h-5 w-5" />
        </Link>
        <Link href="/song" title="song">
          <FaMusic className="h-5 w-5" />
        </Link>
      </div>
    </>
  );
}
