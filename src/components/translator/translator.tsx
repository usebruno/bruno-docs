"use client";
import { useEffect, useMemo, useState } from "react";
import { utils } from "@/components/translator/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { ToolBar } from "@/components/translator/toolbar";
import { EditorLayout } from "@/components/translator/editor-layout";


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
      return utils(line);
    });
  }, [pmCode]);
  const copyClipboard = () => {
    navigator.clipboard.writeText(computedTranslation.join("\n")).then(() => {
      toast('Copied to clipboard !')
    })
  }
  const savePmCode = (code: string[]) => {
    localStorage.setItem('pmCode', JSON.stringify(code));
    setPmCode(code);
  }
  useEffect(() => {
    const savedPmCode = localStorage.getItem('pmCode');
    if (savedPmCode) {
      setPmCode(JSON.parse(savedPmCode));
    }
  }, []);
  return (
    <div className="flex flex-col items-start w-full mt-2">
      <div className="flex items-center justify-between w-full">
        <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
          <DialogContent className="max-w-[calc(100dvw-64px)] w-full h-full max-h-[calc(100dvh-64px)] bg-transparent p-0 border-0">
            <DialogHeader>
              <DialogDescription className="p-0">
                <ToolBar
                  copyClipboard={copyClipboard}
                  openDialog={openDialog}
                  setOpenDialog={setOpenDialog}
                  editorTheme={editorTheme}
                  setEditorTheme={setEditorTheme}
                  setEditorBg={setEditorBg}
                  layoutMode={layoutMode}
                  setLayoutMode={setLayoutMode}
                  className="bg-white dark:bg-zinc-900 -mt-1 rounded-md p-2"
                />
                <EditorLayout
                  pmCode={pmCode}
                  computedTranslation={computedTranslation}
                  setPmCode={savePmCode}
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
          <EditorLayout
            pmCode={pmCode}
            computedTranslation={computedTranslation}
            setPmCode={savePmCode}
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