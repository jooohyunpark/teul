import { codeToHtml } from "shiki"
import { CodeBlockCopy } from "@/components/site/code-block-copy"

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
      <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
        <CodeBlockCopy text={code} />
      </div>
      <div
        className="overflow-x-auto rounded-lg border text-xs leading-relaxed [&_pre]:!bg-transparent [&_pre]:p-4 [&_code]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
