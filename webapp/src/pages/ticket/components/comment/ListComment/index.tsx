import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Comment, Tooltip } from 'antd';
import moment from 'moment';

import React, { useState, createElement, useEffect } from 'react';
import InputComment from '../InputComment';

interface CommentProps {
  children: React.ReactNode;
  comment?: any;
}

const ListComments = [
  {
    id: 1,
    userId: 3,
    author: 'Han Hana',
    avatar: 'https://joeschmoe.io/api/v1/3',
    content: <p>xin chao ban minh la Hana</p>,
    datetime: 'two days ago',
    like: 4,
    dislike: 0,
    comment: [
      {
        id: 11,
        userId: 2,
        author: 'Han Solo',
        avatar: 'https://joeschmoe.io/api/v1/2',
        content: (
          <p>
            <strong>helllo </strong>
            <a href="1" className="wysiwyg-mention" data-mention data-value="Han Hana">
              <strong>@Han Hana</strong>
            </a>
            <strong> </strong>
          </p>
        ),
        datetime: 'a day ago',
        like: 0,
        dislike: 1,
        comment: [
          {
            id: 121,
            userId: 2,
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/2',
            content: 'Xin chao Chan',
            datetime: 'two hour ago',
            like: 1,
            dislike: 1,
            comment: [],
          },
          {
            id: 121,
            userId: 2,
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/2',
            content: 'Xin chao Chan',
            datetime: 'two hour ago',
            like: 1,
            dislike: 1,
            comment: [],
          },
          {
            id: 121,
            userId: 2,
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/2',
            content: 'Xin chao Chan',
            datetime: 'two hour ago',
            like: 1,
            dislike: 1,
            comment: [],
          },
          {
            id: 121,
            userId: 2,
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/2',
            content: 'Xin chao Chan',
            datetime: 'two hour ago',
            like: 1,
            dislike: 1,
            comment: [],
          },
          {
            id: 121,
            userId: 2,
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/2',
            content: 'Xin chao Chan',
            datetime: 'two hour ago',
            like: 1,
            dislike: 1,
            comment: [],
          },
          {
            id: 121,
            userId: 2,
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/2',
            content: 'Xin chao Chan',
            datetime: 'two hour ago',
            like: 1,
            dislike: 1,
            comment: [],
          },
          {
            id: 121,
            userId: 2,
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/2',
            content: 'Xin chao Chan',
            datetime: 'two hour ago',
            like: 1,
            dislike: 1,
            comment: [],
          },
          {
            id: 121,
            userId: 2,
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/2',
            content: 'Xin chao Chan',
            datetime: 'two hour ago',
            like: 1,
            dislike: 1,
            comment: [],
          },
        ],
      },
      {
        id: 12,
        userId: 5,
        author: 'Kim Chan',
        avatar: 'https://joeschmoe.io/api/v1/5',
        content: (
          <h2>
            <span>kkkk</span>
          </h2>
        ),
        datetime: 'a day ago',
        like: 2,
        dislike: 1,
        comment: [
          {
            id: 121,
            userId: 2,
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/2',
            content: 'Xin chao Chan',
            datetime: 'two hour ago',
            like: 1,
            dislike: 1,
            comment: [],
          },
          {
            id: 122,
            userId: 3,
            author: 'Han Hana',
            avatar: 'https://joeschmoe.io/api/v1/3',
            content: 'Xin chao Chan, rat vui duoc lam quen',
            datetime: 'a hour ago',
            like: 3,
            dislike: 1,
            comment: [],
          },
          {
            id: 123,
            userId: 3,
            author: 'Han Hana',
            avatar: 'https://joeschmoe.io/api/v1/3',
            content: (
              <p>
                mkmk{' '}
                <a
                  href="http://localhost:3000/comment/3"
                  className="wysiwyg-mention"
                  data-mention
                  data-value="Kim Chan"
                >
                  @Kim Chan
                </a>
                &nbsp;
              </p>
            ),
            datetime: 'a hour ago',
            like: 3,
            dislike: 1,
            comment: [],
          },
          {
            id: 124,
            userId: 3,
            author: 'Han Hana',
            avatar: 'https://joeschmoe.io/api/v1/3',
            content: 'Xin chao Chan, rat vui duoc lam quen',
            datetime: 'a hour ago',
            like: 3,
            dislike: 1,
            comment: [],
          },
          {
            id: 125,
            userId: 3,
            author: 'Han Hana',
            avatar: 'https://joeschmoe.io/api/v1/3',
            content: 'Xin chao Chan, rat vui duoc lam quen',
            datetime: 'a hour ago',
            like: 3,
            dislike: 1,
            comment: [],
          },
        ],
      },
    ],
  },
];

const ExampleComment: React.FC<CommentProps> = ({ children, comment }) => {
  const [isShowInputComment, setShowInputComment] = useState(false);
  useEffect(() => {
    if (comment.showInput) setShowInputComment(true);
  }, [comment.showInput]);
  const [first, setFirst] = useState(false);
  const [likes, setLikes] = useState(comment.like);
  const [dislikes, setDislikes] = useState(comment.dislike);
  const [action, setAction] = useState('');

  const like = () => {
    if (!first) {
      setLikes(likes + 1);
      setFirst(true);
    } else {
      setLikes(likes + 1);
      setDislikes(dislikes - 1);
    }
    setAction('liked');
  };

  const dislike = () => {
    if (!first) {
      setDislikes(dislikes + 1);
      setFirst(true);
    } else {
      setLikes(likes - 1);
      setDislikes(dislikes + 1);
    }
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span
      onClick={() => {
        setShowInputComment((prev) => !prev);
      }}
      key="comment-basic-reply-to"
    >
      Reply to
    </span>,
  ];
  return (
    <>
      <Comment
        actions={actions}
        author={<a>{comment.author}</a>}
        avatar={<Avatar src={comment.avatar} alt={comment.author} />}
        content={comment.content}
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{comment.datetime}</span>
          </Tooltip>
        }
      >
        {isShowInputComment ? <InputComment /> : <></>}
        {children}
      </Comment>
    </>
  );
};
//eslint-disable-next-line
const ListComment: React.FC = ({ scroll }: any) => {
  // const scrollTargetElementRef = useRef<HTMLDivElement | null>(null);
  const renderComment = (comment: any) => {
    return comment.map((item: any) => {
      return (
        <div key={item}>
          <ExampleComment
            comment={{
              author: item.author,
              avatar: item.avatar,
              datetime: item.datetime,
              content: item.content,
              like: item.like,
              dislike: item.dislike,
            }}
          >
            {item.comment.length > 0 ? renderComment(item.comment) : null}
          </ExampleComment>

        </div>
      );
    });
  };
  return <div>{renderComment(ListComments)}</div>;
};



export default ListComment;
