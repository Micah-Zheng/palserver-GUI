import { AlertDialog, ContextMenu } from "@radix-ui/themes";
import React, { useState } from "react";
import { LuFileCog, LuFolderCog } from "react-icons/lu";
import {
  __dirname,
  electron,
  ipcRenderer,
} from "../../../../constant/contextBridge";
import useAppLanguage from "../../../../redux/appLanguage/useAppLanguage";
import LOCALES from "../../../../locales";
import RenameLuaMod from "./RenameLuaMod/RenameLuaMod";

type Props = {
  name: string;
  rename: string;
  isDirectory: boolean;
  enabled: boolean;
};

export default function LuaModItem(props: Props) {
  const { appLanguage } = useAppLanguage();

  // const [modEnabled, setModEnabled] = useState(props.enabled);
  // const handleEnabledMod = () => {
  //   ipcRenderer.send("request-enabled-lua-mods", props.name, !modEnabled);
  //   setModEnabled(!modEnabled);
  // };

  const handleViewSourceCode = () => {
    electron.openExplorer(
      `/engine/steamapps/common/PalServer/Pal/Binaries/Win64/Mods/${props.name}`
    );
  };

  const handleDeleteMod = () => {
    ipcRenderer.send("request-delete-lua-mods", props.name);
  };

  return (
    <AlertDialog.Root>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div
            // style={{ opacity: modEnabled ? 1 : 0.3 }}
            className={
              "flex flex-col gap-y-2 items-center w-28 h-24 p-2 cursor-pointer rounded-lg hover:bg-bg1 relative"
            }
          >
            {props.isDirectory ? (
              <LuFolderCog size={32} className="absolute top-4" />
            ) : (
              <LuFileCog size={32} className="absolute top-4" />
            )}
            <span className="absolute top-14 text-xs text-center w-24 break-words">
              {props.rename}
            </span>
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Group>
            {/* <AlertDialog.Trigger onClick={handleEnabledMod}>
              <ContextMenu.Item shortcut=" ">
                {modEnabled
                  ? LOCALES[appLanguage].Disabled
                  : LOCALES[appLanguage].Enabled}
                {LOCALES[appLanguage].Mod}
              </ContextMenu.Item>
            </AlertDialog.Trigger> */}
            {props.isDirectory && (
              <ContextMenu.Item onClick={handleViewSourceCode}>
                {LOCALES[appLanguage].OpenFilePath}
              </ContextMenu.Item>
            )}
            <AlertDialog.Trigger>
              {/* 重新命名 */}
              <ContextMenu.Item>{LOCALES[appLanguage].Rename}</ContextMenu.Item>
            </AlertDialog.Trigger>
          </ContextMenu.Group>
          <ContextMenu.Separator />
          {/* 刪除模組 */}
          <ContextMenu.Item shortcut="⌫" color="red" onClick={handleDeleteMod}>
            {LOCALES[appLanguage].DeleteMod}
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
      <RenameLuaMod name={props.name} rename={props.rename} />
    </AlertDialog.Root>
  );
}
