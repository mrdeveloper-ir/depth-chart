import "./chart-controls.css";

import {
  Alignment,
  Button,
  ButtonGroup,
  IconName,
  Menu,
  MenuDivider,
  MenuItem,
} from "@blueprintjs/core";
import { Popover2, Tooltip2 } from "@blueprintjs/popover2";

import { INTERVALS } from "../../../helpers";
import {
  ChartType,
  chartTypeLabels,
  Overlay,
  overlayLabels,
  Study,
  studyLabels,
} from "../../../types";
import { Interval } from "../../api/vega-graphql";

const chartTypeIcon = new Map<ChartType, IconName>([
  [ChartType.AREA, "timeline-area-chart"],
  [ChartType.CANDLE, "waterfall-chart"],
  [ChartType.LINE, "timeline-line-chart"],
  [ChartType.OHLC, "timeline-line-chart"],
]);

export type ChartControlsProps = {
  interval: Interval;
  chartType: ChartType;
  overlays: Overlay[];
  studies: Study[];
  onSetInterval: (interval: Interval) => void;
  onSetChartType: (chartType: ChartType) => void;
  onSetOverlays: (overlay: Overlay[]) => void;
  onSetStudies: (study: Study[]) => void;
  onSnapshot: () => void;
};

export const ChartControls = ({
  interval,
  chartType,
  overlays,
  studies,
  onSetInterval,
  onSetChartType,
  onSetOverlays,
  onSetStudies,
  onSnapshot,
}: ChartControlsProps) => (
  <div className="chart-controls">
    <ButtonGroup className="chart-controls__button-group" minimal>
      <Popover2
        minimal={true}
        content={
          <Menu>
            <MenuDivider title="Minutes" />
            <MenuItem
              icon={INTERVALS[interval] === "1m" ? "tick" : "blank"}
              text="1m"
              onClick={() => onSetInterval(Interval.I1M)}
            />
            <MenuItem
              icon={INTERVALS[interval] === "5m" ? "tick" : "blank"}
              text="5m"
              onClick={() => onSetInterval(Interval.I5M)}
            />
            <MenuItem
              icon={INTERVALS[interval] === "15m" ? "tick" : "blank"}
              text="15m"
              onClick={() => onSetInterval(Interval.I15M)}
            />
            <MenuDivider title="Hours" />
            <MenuItem
              icon={INTERVALS[interval] === "1h" ? "tick" : "blank"}
              text="1h"
              onClick={() => onSetInterval(Interval.I1H)}
            />
            <MenuItem
              icon={INTERVALS[interval] === "6h" ? "tick" : "blank"}
              text="6h"
              onClick={() => onSetInterval(Interval.I6H)}
            />
            <MenuDivider title="Days" />
            <MenuItem
              icon={INTERVALS[interval] === "1d" ? "tick" : "blank"}
              text="1d"
              onClick={() => onSetInterval(Interval.I1D)}
            />
          </Menu>
        }
        placement="bottom-start"
      >
        <div className="chart-controls__menu-button-wrapper">
          <Button
            alignText={Alignment.LEFT}
            fill
            rightIcon="caret-down"
            text={INTERVALS[interval]}
          />
        </div>
      </Popover2>
      <Popover2
        minimal={true}
        content={
          <Menu>
            {Object.values(ChartType).map((item) => (
              <MenuItem
                key={item}
                text={chartTypeLabels[item]}
                icon={chartType === item ? "tick" : "blank"}
                onClick={() => onSetChartType(item)}
              />
            ))}
          </Menu>
        }
        placement="bottom-start"
      >
        <Button
          rightIcon="caret-down"
          icon={chartTypeIcon.get(chartType) ?? "waterfall-chart"}
        />
      </Popover2>
      <Popover2
        minimal={true}
        content={
          <Menu>
            <MenuDivider title="Overlays" />
            {Object.values(Overlay).map((item) => (
              <MenuItem
                key={item}
                icon={overlays.includes(item) ? "tick" : "blank"}
                text={overlayLabels[item]}
                onClick={() => {
                  const newOverlays = [...overlays];

                  const index = overlays.findIndex(
                    (overlay) => overlay === item
                  );

                  index !== -1
                    ? newOverlays.splice(index, 1)
                    : newOverlays.push(item);

                  onSetOverlays(newOverlays);
                }}
              />
            ))}
            <MenuDivider title="Studies" />
            {Object.values(Study).map((item) => (
              <MenuItem
                key={item}
                icon={studies.includes(item) ? "tick" : "blank"}
                text={studyLabels[item]}
                onClick={() => {
                  const newStudies = [...studies];

                  const index = studies.findIndex((study) => study === item);

                  index !== -1
                    ? newStudies.splice(index, 1)
                    : newStudies.push(item);

                  onSetStudies(newStudies);
                }}
              />
            ))}
          </Menu>
        }
        placement="bottom-start"
      >
        <Button rightIcon="caret-down" icon="function" />
      </Popover2>
    </ButtonGroup>
    <ButtonGroup minimal>
      <Tooltip2 content="Save image">
        <Button icon="camera" onClick={onSnapshot} />
      </Tooltip2>
    </ButtonGroup>
  </div>
);
