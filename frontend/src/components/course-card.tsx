'use client';

import type { Course } from '@/types/course';
import type { Student } from '@/types/student';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StudentSelectionModal } from '@/components/student-selection-modal';
import { useState } from 'react';

interface CourseCardProps {
  course: Course;
  students: Student[];
}

export function CourseCard({ course, students }: CourseCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Course {course.id}</CardTitle>
          <CardDescription>
            <a
              href={course.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View PDF
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsModalOpen(true)} className="w-full">
            Teach
          </Button>
        </CardContent>
      </Card>

      <StudentSelectionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        students={students}
        courseId={course.id}
      />
    </>
  );
}
