import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";

const DrafJs = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [data, setData] = useState("");
    useEffect(() => {
        setData(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }, [editorState])

    console.log(data);

    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName h-[200px]"
                editorClassName="demo-editor"
                onEditorStateChange={setEditorState}
                mention={{
                    separator: ' ',
                    trigger: '@',
                    suggestions: [
                        { text: 'Han Hana', value: 'Han Hana', url: '1' },
                        { text: 'Han Solo', value: 'Han Solo', url: '2' },
                        { text: 'Kim Chan', value: 'Kim Chan', url: 'http://localhost:3000/comment/3' },
                    ],
                }}
                hashtag={{}}
            // onChange={setData(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
            />;
            {/* <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      /> */}
        </div>
    );
};

export default DrafJs;