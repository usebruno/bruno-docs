"use client";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useData } from 'nextra/data'
import { Editor, useMonaco } from "@monaco-editor/react";
import { postmanTranslation } from "@/components/translator/postman-translation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Columns2, Copy, Expand, Rows2, Shrink } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner"

const transformThemeName = (name: string) => {
  return name
    .replace(/ /g, '-')
    .replace(/[()]/g, "")
    .toLowerCase()
}

const prettifyName = (name: string) => {
  return name
    .replace(/-/g, ' ')
    .replace(/vs/g, 'VS')
    .replace(/dark/g, 'Dark')
    .replace(/light/g, 'Light')
    // capitalize the first letter of each word
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

const ToolBar = ({ copyClipboard, openDialog, setOpenDialog, editorTheme, setEditorTheme, layoutMode, setLayoutMode, className, setEditorBg }: {
  copyClipboard: () => void,
  openDialog: boolean,
  setOpenDialog: (open: boolean) => void,
  editorTheme: string,
  setEditorTheme: (theme: string) => void,
  layoutMode: "col" | "row",
  setLayoutMode: (mode: "col" | "row") => void,
  className?: string,
  setEditorBg: (color: string) => void
}) => {
  const { themes } = useData()
  const monaco = useMonaco();
  const [selectedTheme, setSelectedTheme] = useState(editorTheme);
  const handleThemeChange = async (theme: string) => {
    setSelectedTheme(theme);
    if (theme === 'vs-dark' || theme === 'vs-light') {
      monaco?.editor.setTheme(theme);
      setEditorTheme(theme);
      setEditorBg(theme === 'vs-dark' ? '#1E1E1E' : '#fff')
      return;
    }
    const { default: themeData } = await import(`monaco-themes/themes/${theme}.json`);
    console.log('dynamically imported theme : ', transformThemeName(theme), themeData)
    monaco?.editor.defineTheme(transformThemeName(theme), themeData);
    monaco?.editor.setTheme(theme);
    setEditorTheme(transformThemeName(theme));
    setEditorBg(themeData.colors['editor.background']);
  };
  return (
    <Suspense fallback={<Badge color="slate">Loading themes...</Badge>}>
      <div className={cn("flex w-full justify-between items-center", className)}>
        <div className="flex items-center">
          <Select onValueChange={handleThemeChange}>
            <SelectTrigger className="mr-2">
              <SelectValue placeholder={prettifyName(selectedTheme)} />
            </SelectTrigger>
            <SelectContent>
              {themes.map((theme: string) => (
                <SelectItem value={theme} key={theme}>
                  {prettifyName(theme)}
                </SelectItem>
              ))}
              <SelectItem value="vs-dark">Vs Dark</SelectItem>
              <SelectItem value="vs-light">Vs Light</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center w-fit">
            <ToggleGroup type="single" value={layoutMode}>
              <ToggleGroupItem value="col" onClick={() => setLayoutMode("col")}>
                <Rows2 size={16} />
              </ToggleGroupItem>
              <ToggleGroupItem value="row" onClick={() => setLayoutMode("row")}>
                <Columns2 size={16} />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <div className="flex items-center">
          <Button
            variant="outline"
            className="mr-2 h-10 w-10 p-0"
            onClick={() => copyClipboard()}
          >
            <Copy size={16} />
          </Button>
          <Button
            variant="ghost"
            className="flex items-center"
            onClick={() => setOpenDialog(!openDialog)}
          >
            {openDialog ? (
              <Shrink size={16} />
            ) : (
              <Expand size={16} />
            )}
          </Button>
        </div>
      </div>
    </Suspense>
  )
}


const EditorComponent = ({ pmCode, computedTranslation, setPmCode, language, layoutMode, openDialog, editorTheme, className, editorBg }: {
  pmCode: string[],
  computedTranslation: string[],
  setPmCode: (code: string[]) => void,
  language: string,
  layoutMode: "col" | "row",
  openDialog?: boolean,
  editorTheme?: string,
  className?: string,
  editorBg?: string
}) => {
  const editorClasses = "flex border-zinc-200 dark:border-zinc-700 [&>div]:py-1 [&>div]:!rounded-md [&>div]:overflow-hidden";
  const editorOptions = {
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 3,
    minimap: { enabled: false },
    wordwrap: 'off',
    wrappingIndent: 'indent',
    autoIndent: 'keep',
    formatOnType: true,
    formatOnPaste: true,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    scrollbar: {
      vertical: 'hidden',
      horizontal: 'hidden'
    },
  } as any;
  const rowMode = useMemo(() => (layoutMode === "row"), [layoutMode]);
  return (
    <div className={cn(
      "flex items-center w-full rounded-lg border",
      rowMode ? "flex-row" : "flex-col",
      className
    )}
      style={{ backgroundColor: editorBg }}
    >
      <div className={cn("flex relative", rowMode ? openDialog ? "transition-none w-[calc(49.9%-4.5px)] my-1 max-w-[700px]" : "w-[calc(50%-4.5px)] my-1" : "w-full")}>
        <div className={cn(
          "absolute z-30 p-1 rounded-tl-md rounded-br-md",
          rowMode ? "bottom-2 right-1" : "bottom-1 right-2")}
        >
          <Image src="/postman.svg" alt="postman code" height={30} width={28} className="flex items-center pr-0.5" />
        </div>
        <Editor
          options={editorOptions}
          className={cn(editorClasses, "pl-2", rowMode ? "pr-1 py-2" : "pr-2 pt-2 pb-1")}
          height={openDialog ? rowMode ? '75dvh' : '37.5dvh' : rowMode ? 500 : 300}
          defaultLanguage="javascript"
          defaultValue={pmCode.join("\n")}
          onChange={(value) => setPmCode(value?.split("\n") || [])}
          theme={transformThemeName(editorTheme ?? 'vs-dark')}
        />
      </div>
      <Separator orientation={rowMode ? "vertical" : "horizontal"} className={cn("mx-1 bg-zinc-200/40", rowMode ? openDialog ? 'h-[calc(75dvh+8px)]' : 'w-[1px] h-[508px]' : '')} />
      <div
        className={cn("flex relative", rowMode ? openDialog ? "transition-none w-[calc(49.9%-4.5px)] my-1 max-w-[700px]" : "w-[calc(50%-4.5px)] my-1" : "w-full")}>
        <div className="absolute bottom-2 right-2 z-30 p-1 rounded-tl-md rounded-br-md">
          <Image src="/bruno.svg" alt="bruno code" height={30} width={30} />
        </div>
        <Editor
          options={editorOptions}
          className={cn(editorClasses, "pr-2", rowMode ? "pl-1 py-2" : "pl-2 pt-1 pb-2")}
          height={openDialog ? rowMode ? '75dvh' : '37.5dvh' : rowMode ? 500 : 300}
          defaultLanguage="javascript"
          value={computedTranslation.join("\n")}
          theme={transformThemeName(editorTheme ?? 'vs-dark')}
        />
      </div>
    </div>
  )
}

export const Translator = () => {
  const [layoutMode, setLayoutMode] = useState<"col" | "row">("col");
  const [openDialog, setOpenDialog] = useState(false)
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const [editorBg, setEditorBg] = useState('#1E1E1E');
  const [pmCode, setPmCode] = useState<string[]>([
    '// translate your awesome code',
  ]);
  const computedTranslation = useMemo(() => {
    return pmCode.map((line, index) => {
      return postmanTranslation(line);
    });
  }, [pmCode]);
  const copyClipboard = () => {
    navigator.clipboard.writeText(computedTranslation.join("\n")).then(() => {
      toast('Copied to clipboard !')
    })
  }
  return (
    <div className="flex flex-col items-start w-full mt-2">
      <div className="flex items-center justify-between w-full">
        <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
          <DialogContent className="max-w-[calc(100dvw-64px)] w-full h-full max-h-[calc(100dvh-64px)]">
            <DialogHeader>
              <DialogTitle>Postman to Bruno translator</DialogTitle>
              <DialogDescription>
                <ToolBar
                  copyClipboard={copyClipboard}
                  openDialog={openDialog}
                  setOpenDialog={setOpenDialog}
                  editorTheme={editorTheme}
                  setEditorTheme={setEditorTheme}
                  setEditorBg={setEditorBg}
                  layoutMode={layoutMode}
                  setLayoutMode={setLayoutMode}
                  className="mt-4"
                />
                <EditorComponent
                  pmCode={pmCode}
                  computedTranslation={computedTranslation}
                  setPmCode={setPmCode}
                  language="javascript"
                  layoutMode={layoutMode}
                  editorTheme={editorTheme}
                  editorBg={editorBg}
                  openDialog
                  className="mt-4"
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {!openDialog && (
        <>
          <ToolBar
            copyClipboard={copyClipboard}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            editorTheme={editorTheme}
            setEditorBg={setEditorBg}
            setEditorTheme={setEditorTheme}
            layoutMode={layoutMode}
            setLayoutMode={setLayoutMode}
          />
          <EditorComponent
            pmCode={pmCode}
            computedTranslation={computedTranslation}
            setPmCode={setPmCode}
            language="javascript"
            layoutMode={layoutMode}
            editorTheme={editorTheme}
            editorBg={editorBg}
            className="mt-2"
          />
        </>
      )}
    </div>
  )
}