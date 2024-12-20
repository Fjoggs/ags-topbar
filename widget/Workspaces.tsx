import Gtk from "gi://Gtk?version=3.0";
import { Variable, bind, exec } from "../../../../../usr/share/astal/gjs";
import { Container } from "./Container";

interface WorkspaceOutput {
  id: number;
  type: "workspace";
  name: string;
  focused: boolean;
  visible: boolean;
}

export const Workspaces = () => {
  let names: Variable<Gtk.Widget[]> = Variable([]);

  names.subscribe((value) => {
    console.log("value", value);
  });

  const runScript = () => {
    try {
      const output = exec("swaymsg -t get_workspaces");
      const nodes: WorkspaceOutput[] = JSON.parse(output);
      names.set(
        nodes.map((node: WorkspaceOutput) => {
          return (
            <button className={node.focused ? "active" : ""}>
              {node.name}
            </button>
          );
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  runScript();

  return <Container>{bind(names)}</Container>;
};
