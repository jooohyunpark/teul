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
    <div className="relative">
      <div className="absolute top-4 right-4">
        <CodeBlockCopyButton text={code} />
      </div>
      <div
        className="overflow-x-auto rounded border bg-card text-sm leading-relaxed [&_code]:font-mono [&_pre]:bg-transparent! [&_pre]:p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
