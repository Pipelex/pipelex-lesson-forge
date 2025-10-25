'use client';

import type { Student } from '@/types/student';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface StudentSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  students: Student[];
  courseId: string;
}

export function StudentSelectionModal({
  open,
  onOpenChange,
  students,
  courseId,
}: StudentSelectionModalProps) {
  const router = useRouter();

  const handleStudentSelect = (studentEmail: string) => {
    router.push(`/teach/${courseId}/${encodeURIComponent(studentEmail)}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select a Student</DialogTitle>
          <DialogDescription>Choose a student to teach this course to</DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-4 max-h-[60vh] overflow-y-auto pr-2">
          {students.map((student) => (
            <Button
              key={student.email}
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleStudentSelect(student.email)}
            >
              <div className="text-left">
                <div className="font-medium">{student.student_name}</div>
                <div className="text-sm text-muted-foreground">{student.email}</div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
