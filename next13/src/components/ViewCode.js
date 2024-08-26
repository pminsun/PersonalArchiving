import Highlight from 'react-highlight';
import { IoCloseOutline, IoCopyOutline } from 'react-icons/io5';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function ViewCode(props) {
  const { react, setCodeShow } = props;
  return (
    <section className="viewCode_container">
      <div>
        <div className="title_area">
          <p className="title">React Code</p>
          <div onClick={() => setCodeShow(false)}>
            <IoCloseOutline fontSize={24} />
          </div>
        </div>
        <div>
          <div className="copy_area">
            <CopyToClipboard
              className="copyClipboard"
              text={react}
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
            <Highlight className="javascript">{react}</Highlight>
          </pre>
        </div>
      </div>
    </section>
  );
}
