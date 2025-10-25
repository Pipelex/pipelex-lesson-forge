import type { Student } from '@/types/student';
import { StudentCard } from '@/components/student-card';
import studentsData from './students.json';

const students = studentsData as Student[];

export default function StudentsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Students</h1>
        <p className="text-muted-foreground">View and manage student profiles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <StudentCard key={student.email} student={student} />
        ))}
      </div>
    </div>
  );
}
