import Link from 'next/link';

export default function Home() {
  return (
    <main className="home_container">
      <div className="link_area">
        <Link href={'/fullpagescroll'}>fullpagescroll</Link>
      </div>
    </main>
  );
}
