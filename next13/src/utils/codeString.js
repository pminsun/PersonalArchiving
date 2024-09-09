// scroll
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

export const fullPageScrollCssCode = `
.fullPageList_area {
  @apply flex_center w-full h-full pt-[50px];

  .link_area {
    a {
      @apply block p-3 rounded-md text-white bg-lime-600;
    }
  }
}

.outer {
  @apply relative w-full h-screen overflow-hidden;

  .inner {
    @apply relative flex_center w-full h-screen py-[5.64vmin];
  }
}

.gotoTop {
  @apply absolute w-20 h-20 z-30 text-white bg-blue-500 rounded-full cursor-pointer flex_center bottom-10 right-10;
}

.dot_area {
  @apply flex_vertical_center flex-col gap-2 absolute_yHalf left-10 z-30;

  .dot {
    @apply flex_center text-white w-8 h-8 cursor-pointer rounded-full bg-slate-500;
  }
}

`;

// scroll horizontal
export const fullPageScrollHorizontalCode = `
import { useEffect, useRef, useState } from 'react';

export default function FullpageScrollHorizontal() {
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

      const pageWidth = outerDiv.clientWidth;

      outerDiv.scrollTo({
        top: 0,
        left: (page - 1) * pageWidth,
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

      const { clientWidth, scrollWidth } = outerDiv;
      const pageWidth = clientWidth;
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
          top: 0,
          left: (nextPage - 1) * pageWidth,
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
        style={{ display: 'flex' }}
      >
        <div
          className="bg-red-100 inner"
          style={{ minWidth: '100vw' }}
        >
          풀 스크린 수평 스크롤 - 1
        </div>
        <div
          className="bg-red-200 inner"
          style={{ minWidth: '100vw' }}
        >
          풀 스크린 수평 스크롤 - 2
        </div>
        <div
          className="bg-red-300 inner"
          style={{ minWidth: '100vw' }}
        >
          풀 스크린 수평 스크롤 - 3
        </div>
        <div
          className="bg-red-400 inner"
          style={{ minWidth: '100vw' }}
        >
          풀 스크린 수평 스크롤 - 4
        </div>
      </section>
      <div
        onClick={() => setCurrentPage(1)}
        className="gotoTop"
      >
        first
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

export const fullPageScrollHorizontalCssCode = `
.outer {
  @apply relative w-full h-screen overflow-hidden;

  .inner {
    @apply relative flex_center w-full h-screen py-[5.64vmin];
  }
}
`;

// scroll fadeInout
export const fullPageScrollFadeInOutCode = `
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

        // 백틱 처리 필요
        const currentDiv = outerDivRef.current.querySelector(.inner:nth-child({currentPage}));
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

`;

export const fullPageScrollFadeInOutCssCode = `
.fadeOuter {
  @apply relative w-full h-screen overflow-hidden;

  .inner {
    @apply absolute top-0 left-0 flex_center w-full h-screen py-[5.64vmin];
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
  }

  .inner.active {
    opacity: 1;
    z-index: 1; /* 현재 페이지는 가장 위에 오도록 설정 */
  }

  .inner.exiting {
    opacity: 0;
    z-index: 0; /* 페이드 아웃될 때 뒤로 사라지도록 설정 */
  }
}
`;
