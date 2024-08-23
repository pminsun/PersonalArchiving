import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function FullpageScroll() {
  return (
    <section className="fullPageList_area">
      <div className="flex gap-3 link_area">
        <Link href={'/fullpagescroll/verticality'}>fullpagescroll 수직</Link>
        <Link href={'/fullpagescroll/horizontal'}>fullpagescroll 수평</Link>
        <Link href={'/fullpagescroll/fadeInout'}>fullpagescroll fadeInOut</Link>
      </div>
    </section>
  );
}
