import type { Course } from '@/types/course';
import type { Student } from '@/types/student';
import { personalizeLesson } from '@/actions/personalizeLesson';
import studentsData from '@/app/students/students.json';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TeachPageProps {
  params: Promise<{
    courseId: string;
    studentEmail: string;
  }>;
}

// Mock course data - replace with actual data source
const mockCourse: Course = {
  id: '1',
  pdf_url: 'https://example.com/course.pdf',
  sections: [
    {
      title: 'Introduction to Programming',
      description: 'Learn the basics of programming',
      text: 'Programming is the process of creating instructions for computers to follow...',
    },
  ],
};

export default async function TeachPage({ params }: TeachPageProps) {
  const { courseId, studentEmail } = await params;
  const decodedEmail = decodeURIComponent(studentEmail);

  // Find the student
  const students = studentsData as Student[];
  const student = students.find((s) => s.email === decodedEmail);

  if (!student) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Student Not Found</h1>
        <p>Could not find student with email: {decodedEmail}</p>
      </div>
    );
  }

  // Personalize each section
  const personalizedSections = await Promise.all(
    mockCourse.sections.map((section) => personalizeLesson(student, section)),
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Teaching Session</h1>
        <p className="text-muted-foreground">Personalized lesson for {student.student_name}</p>
      </div>

      <div className="space-y-6">
        {personalizedSections.map((result, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                {result.success ? result.data?.section.title : `Section ${index + 1} - Error`}
              </CardTitle>
              <CardDescription>
                {result.success ? result.data?.section.description : result.error}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result.success ? (
                <pre className="whitespace-pre-wrap text-sm">
                  {JSON.stringify(result.data?.personalizedContent, null, 2)}
                </pre>
              ) : (
                <p className="text-destructive">{result.error}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
