import React, {useRef, useState, useEffect} from "react";
import {Editor} from "@tinymce/tinymce-react";

export default function TinyEditor() {
  const editorRef = useRef(null);
  const [text, setText] = useState("");
  const handleChange = (content, editor) => {
    if (editorRef.current) {
      setText(editorRef.current.getContent());
    }
  };

  useEffect(() => {}, []);
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
        value={text}
        onEditorChange={handleChange}
      />
    </>
  );
}
