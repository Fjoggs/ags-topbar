import AstalNetwork01 from "gi://AstalNetwork";
import { bind } from "../../../../../usr/share/astal/gjs";
import { Container } from "./Container";

export const Network = () => {
  const { wifi } = AstalNetwork01.get_default();

  return (
    <Container>
      <box>
        <icon icon={bind(wifi, "iconName")} />
        <box css="padding-left: 5px" className="strength">
          ({bind(wifi, "strength")})
        </box>
        <box css="padding-left: 5px">{bind(wifi, "ssid")}</box>
      </box>
    </Container>
  );
};
