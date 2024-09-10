export const listCode = `
import { cls } from '@/utils/config';
import { useEffect, useState } from 'react';

export default function List() {
  // 임시 데이터
  const userDatas = [];
  for (var i = 1; i < 6; i++) {
    var newObj = {
      id: i,
      name: user{i},
      content: content-{i},
    };
    userDatas.push(newObj);
  }

  const [countIndex, setCountIndex] = useState(-1);
  const onClickShowFaq = (id, index) => {
    if (countIndex === index) {
      setCountIndex(-1);
    } else {
      setCountIndex(index);
    }
  };

  return (
    <>
      <section className="page_container">
        <p className="page_title">리스트 중 하나 선택</p>
        <ul className="list_area">
          {userDatas.map((data, index) => (
            <li key={data.id}>
              <div className="flex-1">
                <div
                  onClick={() => onClickShowFaq(data.id, index)}
                  className="title_area"
                >
                  <div className="title">
                    <p>{data.name}</p>
                  </div>
                  <div className={cls('close', countIndex === index ? 'transform rotate-45' : '')}>
                    <div className="transform rotate-90 line"></div>
                    <div className="line"></div>
                  </div>
                </div>
                <div className={cls('content_area', countIndex === index ? 'on' : '')}>
                  <p>{data.content}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

`;

export const listCssCode = `
section.page_container {
  @apply w-full h-full pt-[50px];

  .page_title {
    @apply text-center mt-6 mb-10 font-bold;
  }

  > ul.list_area {
    @apply w-[800px] mx-auto border border-black;

    > li {
      @apply flex px-4 border-b border-[#dbdbdb];

      > div {
        @apply flex-1;

        > div.title_area {
          @apply flex items-center justify-between cursor-pointer;

          > .title {
            p {
              @apply flex-1 text-left py-8 leading-10 font-semibold text-[32px] overflow-hidden text-ellipsis whitespace-nowrap;
            }
          }

          > .close {
            @apply w-[40px] h-[40px] relative transition duration-300 ease-in-out;

            .line {
              @apply absolute -translate-y-1/2 top-1/2 w-full h-[3px] bg-[#1c1c1b];
            }
          }
        }

        > div.content_area {
          @apply overflow-hidden transition-all duration-200 invisible max-h-0;

          &.on {
            @apply pt-[20px] pb-[40px] visible max-h-[300px];
          }

          > p {
            @apply text-[20px] text-left leading-8 font-medium;
          }
        }
      }
    }
  }
}

`;
