import { Editor as TinyEditor } from "@tinymce/tinymce-react";
import { plugins, toolbars } from "./options";

interface IPropType {
  setContent: (content: string) => void;
  initialContent?: string;
}

const Editor = ({ setContent, initialContent = "" }: IPropType) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEditorChange = (content: string, _editor: unknown) => {
    setContent(content);
  };

  //   const useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const useDarkMode = false;
  const isSmallScreen = window.matchMedia("(max-width: 1023.5px)").matches;

  return (
    <TinyEditor
      apiKey={import.meta.env.VITE_TINY_MCE_KEY}
      initialValue={initialContent}
      init={{
        height: 300,
        menubar: false,
        toolbar: toolbars,
        plugins: plugins,
        toolbar_sticky: true,
        toolbar_sticky_offset: isSmallScreen ? 0 : 0,
        content_style: "body { line-height: 1; }",
        image_class_list: [
          { title: "Banner image", value: "banner-image" },
          { title: "Other", value: "other-image" },
        ],
        importcss_append: true,
        image_caption: true,
        quickbars_insert_toolbar: "",
        quickbars_selection_toolbar: "",
        noneditable_class: "mceNonEditable",
        toolbar_mode: "sliding",
        contextmenu: "link image table",
        skin: useDarkMode ? "oxide-dark" : "oxide",
        content_css: useDarkMode ? "dark" : "default",
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default Editor;
