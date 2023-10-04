import React, {useRef, useState, useEffect} from "react";
import {Editor} from "@tinymce/tinymce-react";
type Props = {
  content: String,
};
const TinyEditor: React.FC<Props> = ({content}) => {
  const editorRef = useRef(null);
  const [text, setText] = useState("");
  const [length, setLength] = useState(0);
  const [speed, setSpeed] = useState(35);
  const handleChange = (content, editor) => {
    if (editorRef.current) {
      setText(editorRef.current.getContent({format: "text"}));
    }
  };

  useEffect(() => {
    const timer =
      length < content.length &&
      setInterval(() => {
        if (editorRef.current) {
          const currentContent = editorRef.current.getContent({format: "text"});
          const nextChar =
            content[length] === " "
              ? "&nbsp;"
              : content[length] + content[length + 1] === "\n"
              ? "<br>"
              : content[length];
          if (nextChar === ".") {
            setSpeed(350);
          } else {
            setSpeed(35);
          }
          editorRef.current.setContent(currentContent + nextChar, {
            format: "raw",
          });
          setLength(length + 1);
        }
      }, speed);
    return () => clearInterval(timer);
  }, [length, text, speed, content]);

  return (
    <>
      <Editor
        apiKey={process.env.REACT_APP_TINY_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          height: 500,
          placeholder: "Edit your content here...",
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        // value={text}
        onEditorChange={handleChange}
      />
    </>
  );
};
export default TinyEditor;
