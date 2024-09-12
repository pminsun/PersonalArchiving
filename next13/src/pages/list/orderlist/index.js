import { cls } from '@/utils/config';
import { testList } from '@/utils/testList';
import { useEffect, useState } from 'react';
import { FaBookmark, FaStar } from 'react-icons/fa';

export default function Orderlist() {
  const [orderData, setOrderData] = useState(testList);
  const [orderType, setOrderType] = useState('1');

  const selectOrderType = (e) => {
    setOrderType(e.target.value);
  };

  const ratingStar = (value) => {
    const starLength = Array.from({ length: value }, (v, i) => i + 1);
    return starLength;
  };

  useEffect(() => {
    let orderData = [];
    let data = [...testList];
    if (orderType === '1') {
      orderData = data.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    } else {
      orderData = data.sort((a, b) => b.rating - a.rating);
    }

    setOrderData(orderData);
  }, [orderType]);

  const isBookmark = (title) => {
    const isBookmarkOrder = orderData.map((data, index) => {
      if (data.title === title) {
        return {
          ...data,
          bookmark: !data.bookmark,
        };
      }

      return data;
    });

    const sortedDataList = isBookmarkOrder.sort((a, b) => {
      return +b.bookmark - +a.bookmark;
    });

    setOrderData(sortedDataList);
  };

  return (
    <section className="orderlistPage_container">
      <select
        value={orderType}
        onChange={selectOrderType}
      >
        <option value={'1'}>개봉일 최신순</option>
        <option value={'2'}>별점 높은 순</option>
      </select>
      <ul>
        {orderData.map((item, index) => (
          <li key={item.title}>
            <div className="bookmark_area">
              <FaBookmark
                onClick={() => isBookmark(item.title)}
                className={cls(item.bookmark ? '!text-red-500' : 'text-white')}
              />
            </div>
            <div className="rating_area">
              <p className="rating">{item.rating}</p>
              {ratingStar(item.rating).map((star, index) => (
                <FaStar
                  key={index}
                  className="text-yellow-500"
                />
              ))}
            </div>
            <p className="title">{item.title}</p>
            <p className="releasedate">{item.releaseDate}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
