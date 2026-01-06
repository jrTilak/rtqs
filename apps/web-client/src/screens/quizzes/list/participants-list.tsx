import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for initial implementation
const MOCK_PARTICIPANTS = Array.from({ length: 5 }).map((_, i) => ({
  id: `participant-${i + 1}`,
  email: `participant${i + 1}@example.com`,
}));

export const ParticipantsList = () => {
  // In the future, this will be replaced by a real data fetch
  const participants = MOCK_PARTICIPANTS;

  if (participants.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No participants found.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.No</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participants.map((participant, index) => (
            <TableRow key={participant.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{participant.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
