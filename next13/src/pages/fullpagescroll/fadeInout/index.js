import { useEffect, useRef, useState } from 'react';

export default function FullpageScrollFadeInOut() {
  const outerDivRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const totalPage = 4;

  useEffect(() => {
    const outerDiv = outerDivRef.current;
    const innerDivs = outerDiv.querySelectorAll('.inner');

    innerDivs.forEach((div, index) => {
      if (index + 1 === currentPage) {
        div.classList.add('active');
        div.classList.remove('exiting');
      } else {
        div.classList.remove('active');
        if (div.classList.contains('exiting')) {
          setTimeout(() => div.classList.remove('exiting'), 600); // 페이드아웃 후 클래스 제거
        }
      }
    });
  }, [currentPage]);

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      if (isScrolling) return;

      const { deltaY } = e;
      let nextPage = currentPage;

      if (deltaY > 0) {
        nextPage = currentPage + 1;
      } else {
        nextPage = currentPage - 1;
      }

      if (nextPage < 1) nextPage = 1;
      if (nextPage > totalPage) nextPage = totalPage;

      if (nextPage !== currentPage) {
        setIsScrolling(true);

        const currentDiv = outerDivRef.current.querySelector(`.inner:nth-child(${currentPage})`);
        currentDiv.classList.add('exiting');

        setTimeout(() => {
          setCurrentPage(nextPage);
          setIsScrolling(false);
        }, 600);
      }
    };

    const outerDivCurrent = outerDivRef.current;

    if (outerDivCurrent) {
      outerDivCurrent.addEventListener('wheel', wheelHandler);
    }

    return () => {
      if (outerDivCurrent) {
        outerDivCurrent.removeEventListener('wheel', wheelHandler);
      }
    };
  }, [currentPage, isScrolling]);

  return (
    <>
      <section
        ref={outerDivRef}
        className="fadeOuter"
      >
        <div className="bg-red-100 inner active">풀 스크린 fade 스크롤 - 1</div>
        <div className="bg-red-200 inner">풀 스크린 fade 스크롤 - 2</div>
        <div className="bg-red-300 inner">풀 스크린 fade 스크롤 - 3</div>
        <div className="bg-red-400 inner">풀 스크린 fade 스크롤 - 4</div>
      </section>
      <div
        onClick={() => setCurrentPage(1)}
        className="gotoTop"
      >
        First
      </div>
      <ul className="dot_area">
        {Array.from(Array(totalPage), (_, index) => index + 1).map((dot, index) => (
          <li
            key={index}
            className="dot"
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </>
  );
}
