import { useEffect, useRef, useState } from 'react';

export default function FullpageScrollVerticality() {
  const outerDivRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const totalPage = 4;

  // currentPage변경시 페이지 이동
  useEffect(() => {
    const scrollToPage = (page) => {
      const outerDiv = outerDivRef.current;
      if (!outerDiv) return;

      const pageHeight = outerDiv.clientHeight;

      outerDiv.scrollTo({
        top: (page - 1) * pageHeight,
        left: 0,
        behavior: 'smooth',
      });
    };

    scrollToPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      if (isScrolling) return; // 이미 스크롤 중이면 무시

      const { deltaY } = e;
      const outerDiv = outerDivRef.current;

      if (!outerDiv) return;

      const { clientHeight, scrollHeight } = outerDiv;
      const pageHeight = clientHeight;
      let nextPage = currentPage;

      if (deltaY > 0) {
        // 스크롤 내릴 때
        nextPage = currentPage + 1;
      } else {
        // 스크롤 올릴 때
        nextPage = currentPage - 1;
      }

      // 페이지 범위 내로 조정
      if (nextPage < 1) nextPage = 1;
      if (nextPage > totalPage) nextPage = totalPage;

      if (nextPage !== currentPage) {
        // 스크롤이 이미 진행 중이면 다음 스크롤을 무시
        setIsScrolling(true);

        // 이전 스크롤 타임아웃을 클리어
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        // 스크롤 애니메이션 시작
        outerDiv.scrollTo({
          top: (nextPage - 1) * pageHeight,
          left: 0,
          behavior: 'smooth',
        });

        // 스크롤이 완료될 때까지 기다린 후 상태 업데이트
        const timeout = setTimeout(() => {
          setCurrentPage(nextPage);
          setIsScrolling(false);
        }, 600); // 스크롤 속도에 따라 조정

        setScrollTimeout(timeout);
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
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [currentPage, isScrolling, scrollTimeout]);

  return (
    <>
      <section
        ref={outerDivRef}
        className="outer"
      >
        <div className="bg-red-100 inner">풀 스크린 수직 스크롤</div>
        <div className="bg-red-200 inner"></div>
        <div className="bg-red-300 inner"></div>
        <div className="bg-red-400 inner"></div>
      </section>
      <div
        onClick={() => setCurrentPage(1)}
        className="gotoTop"
      >
        Top
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
