export interface Appointment {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
}

export const appointments: Appointment[] = [
  {
    title: "Dental Cleaning",
    description: "Routine dental cleaning and checkup",
    startTime: new Date("2025-05-15T09:00:00"),
    endTime: new Date("2025-05-15T09:30:00"),
  },
  {
    title: "Tooth Extraction",
    description: "Extraction of wisdom tooth",
    startTime: new Date("2025-05-15T10:00:00"),
    endTime: new Date("2025-05-15T10:45:00"),
  },
  {
    title: "Consultation for Braces",
    description: "First consultation for orthodontic treatment",
    startTime: new Date("2025-05-15T11:00:00"),
    endTime: new Date("2025-05-15T11:30:00"),
  },
  {
    title: "Root Canal Evaluation",
    description: "Evaluate root canal treatment options",
    startTime: new Date("2025-05-16T08:30:00"),
    endTime: new Date("2025-05-16T09:15:00"),
  },
  {
    title: "Whitening Session",
    description: "Teeth whitening procedure",
    startTime: new Date("2025-05-16T10:30:00"),
    endTime: new Date("2025-05-16T11:00:00"),
  },
  {
    title: "Implant Consultation",
    description: "Discussion about dental implants",
    startTime: new Date("2025-05-16T11:30:00"),
    endTime: new Date("2025-05-16T12:00:00"),
  },
  {
    title: "Follow-up Visit",
    description: "Routine check-up after last procedure",
    startTime: new Date("2025-05-17T09:00:00"),
    endTime: new Date("2025-05-17T09:20:00"),
  },
  {
    title: "Gum Treatment",
    description: "Initial evaluation for gingivitis",
    startTime: new Date("2025-05-17T10:15:00"),
    endTime: new Date("2025-05-17T10:45:00"),
  },
  {
    title: "Bridge Consultation",
    description: "Discuss options for missing teeth bridge",
    startTime: new Date("2025-05-18T11:00:00"),
    endTime: new Date("2025-05-18T11:45:00"),
  },
  {
    title: "Braces Adjustment",
    description: "Monthly tightening session",
    startTime: new Date("2025-05-18T14:00:00"),
    endTime: new Date("2025-05-18T14:30:00"),
  },
  {
    title: "Cavity Filling",
    description: "Fillings for newly discovered cavities",
    startTime: new Date("2025-05-19T09:00:00"),
    endTime: new Date("2025-05-19T09:40:00"),
  },
  {
    title: "Emergency Visit",
    description: "Severe tooth pain",
    startTime: new Date("2025-05-19T10:30:00"),
    endTime: new Date("2025-05-19T11:15:00"),
  },
  {
    title: "Dental Crown Placement",
    description: "Final step of crown procedure",
    startTime: new Date("2025-05-20T10:00:00"),
    endTime: new Date("2025-05-20T10:45:00"),
  },
  {
    title: "Invisalign Evaluation",
    description: "Evaluate suitability for clear aligners",
    startTime: new Date("2025-05-20T11:30:00"),
    endTime: new Date("2025-05-20T12:00:00"),
  },
  {
    title: "Post-op Check",
    description: "Check healing after surgery",
    startTime: new Date("2025-05-21T09:00:00"),
    endTime: new Date("2025-05-21T09:15:00"),
  },
  {
    title: "Pediatric Cleaning",
    description: "Cleaning for child patient",
    startTime: new Date("2025-05-21T10:00:00"),
    endTime: new Date("2025-05-21T10:20:00"),
  },
  {
    title: "Mouthguard Fitting",
    description: "Fitting for sports mouthguard",
    startTime: new Date("2025-05-22T11:00:00"),
    endTime: new Date("2025-05-22T11:30:00"),
  },
  {
    title: "X-ray Review",
    description: "Review x-rays with patient",
    startTime: new Date("2025-05-22T14:00:00"),
    endTime: new Date("2025-05-22T14:20:00"),
  },
  {
    title: "Deep Cleaning",
    description: "Detailed cleaning session",
    startTime: new Date("2025-05-23T10:30:00"),
    endTime: new Date("2025-05-23T11:15:00"),
  },
  {
    title: "Retainer Adjustment",
    description: "Check and adjust retainers",
    startTime: new Date("2025-05-23T13:00:00"),
    endTime: new Date("2025-05-23T13:30:00"),
  },
];
