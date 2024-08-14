import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

import { useResolveColorScheme } from "@/hooks";
import { TaskContent } from "@/client/schema";

type Props = {
  initialContent?: TaskContent;
  onChange: (blocks: TaskContent) => void;
};

export const Editor = (props: Props) => {
  const editor = useCreateBlockNote({
    initialContent: props.initialContent,
  });

  const colorScheme = useResolveColorScheme();

  return (
    <BlockNoteView
      editor={editor}
      style={{ height: "100%" }}
      theme={colorScheme}
      onChange={() => props.onChange(editor.document)}
    />
  );
};
