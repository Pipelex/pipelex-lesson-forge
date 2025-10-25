import type { Student } from '@/types/student';
import { StudentCard } from '@/components/student-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import studentsData from './students.json';

const students = studentsData as Student[];

const classes = [
  'Math 101',
  'Science 201',
  'English Literature',
  'History',
  'Physics',
  'Chemistry',
];

export default function StudentsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Students</h1>
        <p className="text-muted-foreground">View and manage student profiles</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Classes</h2>
        <div className="flex flex-wrap gap-3">
          {classes.map((className) => (
            <Button key={className} variant="outline" asChild>
              <Link href="/students">{className}</Link>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <StudentCard key={student.email} student={student} />
        ))}
      </div>
    </div>
  );
}
