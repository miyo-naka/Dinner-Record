import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Record } from "@/utils/recordUtils";

type RecordCalendarProps = {
  records: Record[];
};

export default function RecordCalendar({ records }: RecordCalendarProps) {
  const events = records.map((record) => ({
    title: record.dishName,
    start: record.date,
    allDay: true,
  }));

  return (
    <div className="w-full min-w-[300px] sm:w-[70%]">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        aspectRatio={window.innerWidth > 640 ? 1.35 : 0.8}
        eventContent={(eventInfo) => (
          <div className="text-[10px] sm:text-sm break-words whitespace-normal bg-blue-100 text-blue-800 rounded p-1 w-full">
            {eventInfo.event.title}
          </div>
        )}
      />
    </div>
  );
}
