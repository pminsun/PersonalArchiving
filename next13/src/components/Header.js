import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';

export default function Header() {
  const router = useRouter();
  return (
    <header>
      <button
        type="button"
        onClick={() => router.back()}
        className="back"
      >
        <FaArrowLeft />
      </button>
      <Link
        href={'/'}
        className="home"
      >
        <h1>개인 아카이빙</h1>
      </Link>
    </header>
  );
}
