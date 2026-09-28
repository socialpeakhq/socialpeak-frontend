"use client";

import { useMemo } from "react";
import {
  EventCalendar,
  EventCalendarProps,
} from "@mui/x-scheduler/event-calendar";
import type { SchedulerEvent } from "@mui/x-scheduler/models";
import styles from "./styles.module.scss";

type IProps<T> = Omit<
  EventCalendarProps<SchedulerEvent, object>,
  "events" | "onEventEditingStart"
> & {
  data: T[];
  mapToEvent: (item: T) => SchedulerEvent;
  onEventClick?: (item: T) => void;
};

export default function Schedule<T>({
  data,
  mapToEvent,
  onEventClick,
  className,
  ...rest
}: IProps<T>) {
  const { events, itemsById } = useMemo(() => {
    const itemsById = new Map<SchedulerEvent["id"], T>();
    const events = data.map((item) => {
      const event = mapToEvent(item);
      itemsById.set(event.id, item);
      return event;
    });
    return { events, itemsById };
  }, [data, mapToEvent]);

  return (
    <EventCalendar
      className={`${styles.schedule} ${className ?? ""}`}
      defaultView="month"
      eventColor="purple"
      eventCreation={false}
      areEventsDraggable={false}
      areEventsResizable={true}
      readOnly
      defaultPreferences={{
        isSidePanelOpen: false,
        ampm: true,
        showEmptyDaysInAgenda: true,
      }}
      viewConfig={undefined}
      {...rest}
      events={events}
      onEventEditingStart={(occurrence, eventDetails) => {
        if (!onEventClick || eventDetails.reason === "creation") return;
        const item = itemsById.get(occurrence.id);
        if (!item) return;
        eventDetails.cancel();
        onEventClick(item);
      }}
    />
  );
}
