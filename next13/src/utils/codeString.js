export const fullPageScrollCode = `
import { useEffect, useRef, useState } from 'react';

export default function FullpageScrollVerticality() {
  const outerDivRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const totalPage = 4;

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
      if (isScrolling) return;

      const { deltaY } = e;
      const outerDiv = outerDivRef.current;

      if (!outerDiv) return;

      const { clientHeight, scrollHeight } = outerDiv;
      const pageHeight = clientHeight;
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

        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        outerDiv.scrollTo({
          top: (nextPage - 1) * pageHeight,
          left: 0,
          behavior: 'smooth',
        });

        const timeout = setTimeout(() => {
          setCurrentPage(nextPage);
          setIsScrolling(false);
        }, 600);

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
      <ViewCode react={fullPageScrollCode} />
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
`;
