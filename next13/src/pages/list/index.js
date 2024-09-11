import Link from 'next/link';

export default function List() {
  return (
    <section className="fullPageList_area">
      <div className="flex gap-3 link_area">
        <Link href={'/list/selectone'}>리스트 중 하나 선택</Link>
        <Link href={'/list/orderlist'}>리스트 정렬</Link>
      </div>
    </section>
  );
}
