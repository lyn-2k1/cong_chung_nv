import { Avatar, Button, Comment, Form } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import DrafJs from './components/any-name-fix-later';


interface CommentItem {
  author: string;
  avatar: string;
  content: React.ReactNode;
  datetime: string;
}

const data = [
  {
    author: 'Han Solo',
    avatar: 'https://joeschmoe.io/api/v1/1',
    content: <p>xin chao</p>,
    datetime: '8/8/2022',
  },
  {
    author: 'Han Han',
    avatar: 'https://joeschmoe.io/api/v1/2',
    content: <p>Chao nhe</p>,
    datetime: '8/8/2022',
  },
  {
    author: 'Han Solo',
    avatar: 'https://joeschmoe.io/api/v1/1',
    content: <p>hihi</p>,
    datetime: '10/8/2022',
  },
  {
    author: 'Han Han',
    avatar: 'https://joeschmoe.io/api/v1/2',
    content: <p>khoe khong</p>,
    datetime: '11/8/2022',
  },
];

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
  setValue: (value: string) => void;
}
//eslint-disable-next-line
const Editor = ({ onChange, onSubmit, submitting, value, setValue }: EditorProps) => {
  return (
    <>
      <Form.Item>
        <DrafJs />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );
};

const InputComment: React.FC = () => {
  const [comments, setComments] = useState<CommentItem[]>(data);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');

  // const commentsRef = useRef<HTMLDivElement>("null");

  // const scrollToBottom = () => {
  //   const scroll = commentsRef.current?.scrollHeight - commentsRef.current?.clientHeight;
  //   commentsRef.current?.scrollTo(0, scroll);
  // };

  const handleSubmit = () => {
    if (!value) return;

    setSubmitting(true);
    setValue('');

    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      setComments([
        ...comments,
        {
          author: 'Han Solo',
          avatar: 'https://joeschmoe.io/api/v1/1',
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
      ]);
      // scrollToBottom();
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <Comment
      avatar={<Avatar src="https://joeschmoe.io/api/v1/2" alt="Han Solo" />}
      content={
        <Editor
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitting={submitting}
          value={value}
          setValue={setValue}
        />
      }
    />
  );
};


export default InputComment;
