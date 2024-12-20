import Gtk from "gi://Gtk?version=3.0";
import { Variable, bind, exec } from "../../../../../usr/share/astal/gjs";
import { Container } from "./Container";
import { Sway, WorkspaceEvent } from "../library/Sway";

export const SwayWorkspaces = () => {
  let names: Variable<Gtk.Widget[]> = Variable([]);
  const sway = Sway.get_default();
  const workspaces = bind(sway, "workspaces");
  const activeWorkspace = Variable("");
  const urgentWorkspace = Variable("");

  sway.connect("workspace", (data: Sway) => {
    const output: WorkspaceEvent = data.stream;
    if (output.change === "focus") {
      const currentActive = output.current?.name || "";
      activeWorkspace.set(currentActive);
      urgentWorkspace.set("");
      redrawWorkspaces();
    } else if (output.change === "urgent") {
      const urgent = output.current?.name || "";
      if (urgent !== activeWorkspace.get()) {
        // no need to highlight if it's the same workspace
        urgentWorkspace.set(urgent);
        redrawWorkspaces();
      }
    }
  });

  const redrawWorkspaces = () =>
    names.set(
      workspaces.get().map((workspace) => {
        let isActive = false;
        if (activeWorkspace.get() === "") {
          isActive = workspace.focused;
        } else {
          isActive = workspace.name === activeWorkspace.get();
        }
        const isUrgent = urgentWorkspace.get() === workspace.name;
        return (
          <button
            onClicked={() => {
              exec(`swaymsg workspace ${workspace.name}`);
            }}
            className={`${isActive ? "active" : ""} ${isUrgent ? "urgent" : ""}`}
            cursor="pointer"
          >
            {workspace.name}
          </button>
        );
      }),
    );

  redrawWorkspaces();

  return (
    <Container>
      <box>{bind(names)}</box>
    </Container>
  );
};
