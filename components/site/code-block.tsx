import { codeToHtml } from "shiki"
import { CodeBlockCopyButton } from "@/components/site/code-block-copy-button"

export async function CodeBlock({
  code,
  lang = "tsx",
}: {
  code: string
  lang?: string
}) {
  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  })

  return (
    <div className="group relative">
      <div className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
        <CodeBlockCopyButton text={code} />
      </div>
      <div
        className="overflow-x-auto rounded-sm border bg-card text-xs leading-relaxed [&_code]:font-mono [&_pre]:bg-transparent! [&_pre]:p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
