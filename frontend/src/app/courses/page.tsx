import type { Course } from '@/types/course';
import type { Student } from '@/types/student';
import { CourseCard } from '@/components/course-card';
import { Button } from '@/components/ui/button';
import studentsData from '@/app/students/students.json';

// Sample data - in production this would come from an API
const courses: Course[] = [
  {
    id: '1',
    pdf_url: 'https://example.com/course1.pdf',
    sections: [],
  },
];

const students = studentsData as Student[];

export default function CoursesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground">Manage and assign courses to students</p>
        </div>
        <Button>Add</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} students={students} />
        ))}
      </div>
    </div>
  );
}
