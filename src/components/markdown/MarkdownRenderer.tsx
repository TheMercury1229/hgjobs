import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { markdownClassNames } from "@/components/markdown/_MarkdownEditor";
import { cn } from "@/lib/utils";
import remarkGfm from "remark-gfm";
export const MarkdownRenderer = ({
  className,
  options,
  ...props
}: MDXRemoteProps & { className?: string }) => {
  return (
    <div className={cn(className, markdownClassNames)}>
      <MDXRemote
        {...props}
        options={{
          mdxOptions: {
            remarkPlugins: [
              remarkGfm,
              ...(options?.mdxOptions?.remarkPlugins ?? []),
            ],
            ...options?.mdxOptions,
          },
        }}
      />
    </div>
  );
};
