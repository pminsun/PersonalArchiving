import Link from 'next/link';

export default function Home() {
  return (
    <main className="home_container">
      <h1>개인 아카이빙</h1>
      <div className="link_area">
        <Link href={'/fullpagescroll'}>fullpagescroll</Link>
      </div>
    </main>
  );
}
