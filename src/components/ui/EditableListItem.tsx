import { useState } from "react";
import { ListItem, TxtButton } from "./index";
import { Switch } from "./Switch";
import { TextArea } from "./TextArea";

interface Buttons {
  [name: string]: (_: {
    text: string;
    setMode: (__: "view" | "edit") => void;
    setText: (__: string) => void;
  }) => void | Promise<void>;
}

interface EditableListItemProps {
  data: { id: string; contents: string };
  viewButtons: Buttons;
  editButtons: Buttons;
}

export function EditableListItem({
  data,
  viewButtons,
  editButtons,
}: EditableListItemProps) {
  const [text, setText] = useState<string>(data.contents);
  const [mode, setMode] = useState<"view" | "edit">("view");

  return (
    <Switch
      value={mode}
      cases={{
        view: (
          <ListItem
            left={<TextArea.View value={text} />}
            right={Object.entries(viewButtons).map(([name, onClick]) => (
              <TxtButton onClick={() => onClick({ text, setMode, setText })}>
                {name}
              </TxtButton>
            ))}
          />
        ),
        edit: (
          <ListItem
            left={<TextArea value={text} setValue={setText} />}
            right={Object.entries(editButtons).map(([name, onClick]) => (
              <TxtButton onClick={() => onClick({ text, setMode, setText })}>
                {name}
              </TxtButton>
            ))}
          />
        ),
      }}
    />
  );
}
