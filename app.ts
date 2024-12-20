import { App } from "astal/gtk3";
import style from "./style.scss";
import { Bar } from "./widget/Bar";
import { subprocess } from "../../../../usr/share/astal/gjs";

console.log("Pre start");
App.start({
  instanceName: "app",
  css: style,
  main() {
    console.log("starting app");
    App.get_monitors().map(Bar);
    console.log("Getting windows", App.get_windows());
  },
});

subprocess(`swaymsg -m -t subscribe '["output"]'`, (out) => {
  const data = JSON.parse(out);
  // unspecified is currently the only value for change
  // https://man.archlinux.org/man/sway-ipc.7.en#0x80000001._OUTPUT
  if (data && data.change && data.change === "unspecified") {
    // Reattach taskbar here
  }
});
