import Gtk from "gi://Gtk?version=3.0";
import { Container } from "./Container";
import { GLib, Variable } from "../../../../../usr/share/astal/gjs";

const time = Variable<string>("").poll(
  1000,
  () => GLib.DateTime.new_now_local().format("%H:%M:%S")!,
);

export const TimeWidget = () => {
  const onClicked = () => {
    console.log("do something");
  };

  return (
    <Container>
      <button onClicked={onClicked} className="time-button" cursor="pointer">
        <label className="time" label={time()} halign={Gtk.Align.CENTER} />
      </button>
    </Container>
  );
};
