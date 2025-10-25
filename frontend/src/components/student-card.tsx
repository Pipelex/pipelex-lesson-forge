import type { Student } from '@/types/student';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{student.student_name}</CardTitle>
        <CardDescription>{student.email}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Performance</p>
            <p className="text-sm">{student.current_performance}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pace</p>
            <p className="text-sm">{student.pace}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Learning Style</p>
            <p className="text-sm">{student.learns_best_with}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Complexity</p>
            <p className="text-sm">{student.complexity}</p>
          </div>
        </div>

        <div className="space-y-2 border-t pt-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Strengths</p>
            <p className="text-sm">{student.strengths}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Needs Help With</p>
            <p className="text-sm">{student.needs_help_with}</p>
          </div>
        </div>

        <div className="space-y-2 border-t pt-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Prior Knowledge</p>
            <p className="text-sm">{student.prior_knowledge}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Hobbies & Interests</p>
            <p className="text-sm">{student.hobbies_interests}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Career Goals</p>
            <p className="text-sm">{student.career_goals}</p>
          </div>
        </div>

        <div className="space-y-2 border-t pt-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Example Style</p>
            <p className="text-sm">{student.example_style}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Question Format</p>
            <p className="text-sm">{student.question_format}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
