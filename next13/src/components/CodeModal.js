import ViewCode from './ViewCode';
import { FaReact } from 'react-icons/fa';
import { FaCss3Alt } from 'react-icons/fa';

export default function CodeModal(props) {
  const { codeReactTxt, show, setShow, codeCssTxt } = props;
  const handleShowCode = (language) => {
    setShow({ ...show, [language]: true });
  };

  return (
    <>
      <div className="tag_area">
        {codeReactTxt && (
          <div
            className="showCode react_tag"
            onClick={() => handleShowCode('react')}
          >
            <span>React</span>
            <div>
              <FaReact fontSize={22} />
            </div>
          </div>
        )}
        {codeCssTxt && (
          <div
            className="showCode css_tag"
            onClick={() => handleShowCode('css')}
          >
            <span>CSS</span>
            <div>
              <FaCss3Alt fontSize={22} />
            </div>
          </div>
        )}
      </div>
      {show.react && (
        <ViewCode
          react={codeReactTxt}
          setCodeClose={setShow}
          show={show}
          codeLang="react"
        />
      )}
      {show.css && (
        <ViewCode
          css={codeCssTxt}
          setCodeClose={setShow}
          show={show}
          codeLang="css"
        />
      )}
    </>
  );
}
