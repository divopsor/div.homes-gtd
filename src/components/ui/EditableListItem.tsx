import { useState } from "react";
import { ListItem, TxtButton } from "components/ui";
import { Switch } from "./Switch";
import { TextArea } from "./TextArea";
import { css } from "@emotion/react";

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
  editButtons?: Buttons;
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
            css={css`
              padding: 6px;
              margin-bottom: 12px;
              border: 1px solid #efefef;
              box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px,
                rgba(0, 0, 0, 0.19) 0px 2px 5px 0px;
              div {
                align-items: flex-start;
              }
            `}
            left={<TextArea.View value={text} />}
            right={Object.entries(viewButtons).map(([name, onClick]) => (
              <TxtButton
                css={css`
                  padding-top: 5px;
                `}
                onClick={() => onClick({ text, setMode, setText })}
              >
                {name}
              </TxtButton>
            ))}
          />
        ),
        edit:
          editButtons == null ? null : (
            <ListItem
              css={css`
                padding: 6px;
                margin-bottom: 12px;
                border: 1px solid #efefef;
                box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px,
                  rgba(0, 0, 0, 0.19) 0px 2px 5px 0px;
                div {
                  align-items: flex-start;
                }
              `}
              left={
                <TextArea
                  css={css`
                    border: white 1px solid;
                    border-bottom: 1px solid #c8c8c8;
                    :focus {
                      outline: none;
                      border-bottom: 1px solid black;
                    }
                  `}
                  value={text}
                  setValue={setText}
                />
              }
              right={Object.entries(editButtons).map(([name, onClick]) => (
                <TxtButton
                  css={css`
                    padding-top: 5px;
                  `}
                  onClick={() => onClick({ text, setMode, setText })}
                >
                  {name}
                </TxtButton>
              ))}
            />
          ),
      }}
    />
  );
}
