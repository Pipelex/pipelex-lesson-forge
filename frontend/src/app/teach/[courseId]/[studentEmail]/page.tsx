interface TeachPageProps {
  params: Promise<{
    courseId: string;
    studentEmail: string;
  }>;
}

export default async function TeachPage({ params }: TeachPageProps) {
  const { courseId, studentEmail } = await params;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Teaching Page</h1>
      <p className="text-muted-foreground">
        Course ID: {courseId}
        <br />
        Student Email: {decodeURIComponent(studentEmail)}
      </p>
      <p className="mt-4 text-sm text-muted-foreground">This page will be implemented later</p>
    </div>
  );
}
