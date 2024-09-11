import { testList } from '@/utils/testList';
import { FaBookmark, FaStar } from 'react-icons/fa';

export default function Orderlist() {
  return (
    <section className="orderlistPage_container">
      <select>
        <option>개봉일 최신순</option>
        <option>별점 높은 순</option>
      </select>
      <ul>
        {testList.map((item, index) => (
          <li>
            <div className="bookmark_area">
              <FaBookmark />
            </div>
            <div className="rating_area">
              <FaStar />
              <p className="rating">{item.rating}</p>
            </div>
            <p className="title">{item.title}</p>
            <p className="releasedate">{item.releaseDate}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
