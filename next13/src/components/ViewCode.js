import Highlight from 'react-highlight';
import { IoCloseOutline, IoCopyOutline } from 'react-icons/io5';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function ViewCode(props) {
  const { react, css, setCodeClose, show, codeLang } = props;

  const handleClose = () => {
    // codeLang이 'react'이면 show.react를 false로, 'css'이면 show.css를 false로 설정
    if (codeLang === 'react') {
      setCodeClose({ ...show, react: false });
    } else if (codeLang === 'css') {
      setCodeClose({ ...show, css: false });
    }
  };

  return (
    <section className="viewCode_container">
      <div>
        <div className="title_area">
          <p className="title">{codeLang === 'react' ? 'React Code' : 'CSS Code'}</p>
          <div onClick={handleClose}>
            <IoCloseOutline fontSize={24} />
          </div>
        </div>
        <div className="codeTxt_area">
          <div className="copy_area">
            <CopyToClipboard
              className="copyClipboard"
              text={codeLang === 'react' ? react : css}
              onCopy={() => alert('코드를 복사했습니다')}
            >
              <div className="copy">
                <p>복사하기</p>
                <div>
                  <IoCopyOutline fontSize={18} />
                </div>
              </div>
            </CopyToClipboard>
          </div>
          <pre className="code-style">
            {codeLang === 'react' && <Highlight className="javascript">{react}</Highlight>}
            {codeLang === 'css' && <Highlight className="css">{css}</Highlight>}
          </pre>
        </div>
      </div>
    </section>
  );
}
