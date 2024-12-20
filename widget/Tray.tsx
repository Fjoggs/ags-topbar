import Tray from "gi://AstalTray";
import { Container } from "./Container";
import { bind } from "../../../../../usr/share/astal/gjs";
import Gdk from "gi://Gdk?version=3.0";

export const TrayWidget = () => {
  const tray = Tray.get_default();
  return (
    <Container>
      {bind(tray, "items").as((items) =>
        items.map((item) => {
          const menu = item.create_menu();

          return (
            <button
              cursor="pointer"
              tooltipMarkup={bind(item, "tooltipMarkup")}
              onDestroy={() => menu?.destroy()}
              onClickRelease={(self) => {
                menu?.popup_at_widget(
                  self,
                  Gdk.Gravity.SOUTH,
                  Gdk.Gravity.NORTH,
                  null,
                );
              }}
            >
              <icon gIcon={bind(item, "gicon")} />
            </button>
          );
        }),
      )}
    </Container>
  );
};
