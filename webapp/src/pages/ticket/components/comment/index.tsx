import { Card } from 'antd';
import React, { useRef } from 'react';
import InputComment from './InputComment';
import ListComment from './ListComment';

const Comment: React.FC = () => {
  const scrollTargetElementRef = useRef<HTMLDivElement | null>();
  const handleClick = () => {
    console.log(scrollTargetElementRef.current?.offsetTop);
    scrollTargetElementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  // useEffect(()=> {
  //     scrollTargetElementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // }, [])
  return (
    <div className="flex ">
      <Card style={{ width: 800 }}>
        {/* <ListComment scroll={scrollTargetElementRef} /> */}
        <ListComment />
        <InputComment />
      </Card>
      <div>
        <button onClick={() => handleClick()}>notification</button>
      </div>
    </div>
  );
};

export default Comment;
