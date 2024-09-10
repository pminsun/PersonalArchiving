import CodeModal from '@/components/CodeModal';
import { useCodeShowStore } from '@/stores/codeStore';
import { cls } from '@/utils/config';
import { listCode, listCssCode } from '@/utils/listCodeString';
import { useEffect, useState } from 'react';

export default function List() {
  const { codeShow, setCodeShow, resetCodeShow } = useCodeShowStore();
  // codeTag reset
  useEffect(() => {
    resetCodeShow();
  }, []);

  // 임시 데이터
  const userDatas = [];
  for (var i = 1; i < 6; i++) {
    var newObj = {
      id: i,
      name: `user${i}`,
      content: `content-${i}`,
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
      <CodeModal
        codeReactTxt={listCode}
        codeCssTxt={listCssCode}
        show={codeShow}
        setShow={setCodeShow}
      />
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
