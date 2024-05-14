// File: components/markdown.tsx

import clsx from "clsx";
import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  index: number;
  message: string;
}

const Markdown = ({ message, index }: MarkdownProps) => {
  return (
    <ReactMarkdown
      components={{
        a({ children, href }) {
          return (
            <a href={href} target="_blank" className="underline text-black">
              {children}
            </a>
          );
        },
      }}
      className={clsx(
        "w-full mt-4 pt-4 prose break-words prose-p:leading-relaxed prose-pre:p-0",
        index !== 0 && "border-t"
      )}
    >
      {message}
    </ReactMarkdown>
  );
};

export default Markdown;
