import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link href={'/'}>
        <h1>개인 아카이빙</h1>
      </Link>
    </header>
  );
}
