import { Astal, Gdk, Gtk } from "astal/gtk3";
import { TrayWidget } from "./Tray";
import { Network } from "./Network";
import { TimeWidget } from "./Time";
import { SwayWorkspaces } from "./SwayWorkspaces";

export const Bar = (gdkmonitor: Gdk.Monitor) => (
  <window
    className="Bar"
    gdkmonitor={gdkmonitor}
    anchor={
      Astal.WindowAnchor.TOP |
      Astal.WindowAnchor.LEFT |
      Astal.WindowAnchor.RIGHT
    }
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
  >
    <centerbox>
      <box halign={Gtk.Align.START}>
        <SwayWorkspaces />
        <Network />
      </box>
      <box halign={Gtk.Align.CENTER}>
        <TimeWidget />
      </box>
      <box halign={Gtk.Align.END}>
        <TrayWidget />
      </box>
    </centerbox>
  </window>
);
